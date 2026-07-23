---
name: ticket-run
description: 승인된 티켓의 순차 실행 스킬. "티켓 확인해줘/실행해줘", "/tp:run" 시 반드시 사용. 승인·의존성·중복 방지 프로토콜을 따르며 티켓 범위 밖 작업을 하지 않는다. 실행 종료 후 ticket-optimize를 자동 호출한다.
---

# ticket-run — 승인된 티켓의 순차 실행

## 목적

`.ticket-pilot/tickets.json`의 approved 티켓을 우선순위·의존성 순으로 **1건씩 직렬** 실행하고, 결과와 증빙을 기록한다. 핵심 통제 2가지:
- **승인된 티켓만 실행한다.** draft·rejected 실행 요청은 거부하고 승인 절차를 안내한다.
- **같은 티켓을 두 번 실행하지 않는다.** 실행 시작 전에 in_progress를 저장해 세션이 끊겨도 중복이 없다.

## 입력

- `.ticket-pilot/tickets.json` — 유일한 원본. 없으면 "/tp:init 먼저"를 안내하고 중단
- `.ticket-pilot/config.json` (screenshot 설정)
- 사용자가 특정 티켓 ID를 지정했으면 그 티켓만 대상으로 한다 (단, 아래 프로토콜의 자격 검사는 동일하게 적용)

## 실행 프로토콜 (순서 엄수)

1. **로드와 중단 복구 확인**: tickets.json을 읽고 파일의 `updated_at`을 기억한다(로드 시점 값). `in_progress` 티켓이 이미 있으면 — 직전 세션이 중단된 상황이다 — **사용자에게 질의한다**: "T-xxx가 진행중 상태로 남아 있습니다. 이어서 재개할까요, 보류(blocked)로 돌릴까요?" 자동으로 결정하지 않는다. 재개를 선택하면 이미 완료된 단계를 파일 상태로 확인하고 남은 단계부터 이어간다(같은 변경을 두 번 가하지 않는다).

2. **다음 티켓 선택**: `status=approved`이고 `depends_on`의 티켓이 **전부 done**인 것 중 priority 오름차순(동률이면 ID 오름차순) 첫 번째. 없으면 6단계로 간다. depends_on이 done이 아닌 approved 티켓만 남았으면 그 사실을 보고한다.

3. **선점 기록(중복 방지)**: 선택한 티켓의 status를 `in_progress`로, 티켓과 파일의 `updated_at`을 현재 시각으로 바꿔 **저장부터 한다.** 저장이 끝난 뒤에만 실행을 시작한다.
   - **동시 세션 가드**: 이 저장 직전(이후 4~5단계의 모든 저장도 동일) 파일의 `updated_at`을 다시 읽어 로드 시점 값과 비교한다. 달라져 있으면 다른 세션이 이 파일을 고친 것이다 — 실행을 중단하고 "다른 세션의 변경이 감지되어 중단했다"고 보고한다. 실행(run) 세션은 동시에 1개만 전제한다.

4. **실행**: 티켓의 `steps`를 순서대로 수행한다. 마지막 "검증:" 단계의 통과를 실제로 확인한다.
   - **티켓 범위 밖 작업이 필요해 보이면: 하지 않는다.** 대신 result.followups에 한 줄로 기록만 한다. (예: 실행 중 발견한 버그, 하는 김에 좋아 보이는 개선)
   - 실행이 실패하거나 외부 조건(누락 파일, 권한, 의존성)에 막히면: status를 `blocked`로 바꿔 저장하고, 사유와 재개 조건을 대화에 보고한 뒤 2단계로 돌아간다. blocked의 재실행은 사용자가 재승인(approved로 복귀)한 뒤에만 한다.

5. **완료 기록**: 검증 통과 시 status를 `done`으로 바꾸고 `result`를 채워 저장한다:

```json
{
  "summary": "무엇을 했는지 3문장 이내",
  "files_changed": ["src/login.js"],
  "evidence": [ { "type": "screenshot", "path": "artifacts/T-001/shot1.png", "note": "" } ],
  "followups": ["실행 중 발견한 후속 작업 요약 (티켓화는 ticket-optimize가 제안)"],
  "completed_at": "2026-07-23T18:00:00+09:00"
}
```

   - `evidence.type`은 `screenshot | diff | file` 중 하나 (수집 규칙은 아래)
   - 저장 후 아래 "증빙 수집"을 수행하고 board.html을 재생성한다 (재생성 절차는 이 문서 마지막 절)

6. **반복과 마무리**: 자격 있는 approved가 소진될 때까지 2~5를 반복한다. 끝나면 **ticket-optimize 스킬을 자동 호출**하고(완료 티켓 정리·후속 제안·리포트 갱신), 실행 요약(완료 n건 · blocked n건 · 각 결과 1줄)을 보고한다.

### 실행 거부 규칙

- `draft`·`rejected` 티켓의 실행 요청 → 거부: "승인되지 않은 티켓입니다. board.html에서 승인하거나 'T-xxx 승인해줘'라고 말한 뒤 실행하세요."
- `done` 티켓의 재실행 요청 → 재오픈 절차 없이는 **절대 거부**: "이미 완료된 티켓입니다. 다시 실행하려면 'T-xxx 재오픈해줘'라고 명시적으로 요청하세요." 재오픈(done→approved)은 사용자의 명시 요청에만 처리하고, 그 후 일반 프로토콜로 실행한다.

## 증빙 수집 규칙

- 다음 3조건이 모두 참이면 결과 화면을 캡처한다: ① config.json의 `screenshot`이 `"auto"` ② 웹 프로젝트다(열 수 있는 HTML/URL이 있다) ③ 캡처 수단이 있다(Playwright 등).
  - 저장 위치: `.ticket-pilot/artifacts/T-XXX/` · **티켓당 최대 2장 · PNG 폭 1280px 이하** (저장소 용량 상한)
  - evidence에 `{ "type": "screenshot", "path": "artifacts/T-XXX/…", "note": "…" }`로 기록 (board.html 기준 상대 경로)
- 캡처 수단이 없으면 설치를 제안해도 된다. 단 **설치·캡처의 실패가 티켓 실패로 이어져서는 안 된다** — 실패 시 조용히 대체 경로로 간다.
- 캡처 불가 시 대체: `diff`(변경 요약 텍스트) 또는 `file`(산출물 경로)로 기록한다. 증빙 없는 done은 만들지 않는다 (최소 diff 요약 1건).

## 보드 재생성 절차

1. 템플릿 확보 우선순위: (a) 플러그인의 `skills/ticket-create/assets/board.html` → (b) 권한 차단 시 기존 `.ticket-pilot/board.html`을 캐리어로 사용 → (c) 둘 다 불가 시 재생성을 건너뛰고 보고. **보드 HTML을 임의로 새로 작성하지 않는다.**
2. HTML 안의 `<script id="tickets-data" type="application/json">…</script>` 내용을 tickets.json 전문으로 교체한다 (`</` → `<\/` 이스케이프).
3. `.ticket-pilot/board.html`로 저장한다.

## 완료 기준

- [ ] 실행된 모든 티켓이 approved → in_progress(선저장) → done/blocked 경로만 거쳤다
- [ ] done 티켓 전건에 result(summary·files_changed·evidence·completed_at)가 있다
- [ ] 미승인·완료 티켓을 실행하지 않았다
- [ ] board.html이 최신 상태다
- [ ] ticket-optimize가 호출되었고 실행 요약이 보고되었다
