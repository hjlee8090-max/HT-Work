---
name: ticket-optimize
description: 완료 티켓 정리와 후속 티켓 제안 스킬. ticket-run 종료 시 자동 호출되며, "후속 제안 정리해줘" 요청에도 응답한다. done 티켓의 followups를 모아 후속 제안을 표로 보고하고, blocked 사유를 요약하며, 리포트 탭을 최신화한다.
---

# ticket-optimize — 완료 정리 · 후속 제안

## 목적

실행이 끝난 뒤의 정리 단계다. done 티켓의 결과에서 후속 작업 후보를 뽑아 **대화에 표로 제안**하고(파일 기록은 사용자 승인 후), blocked 티켓을 요약 보고하고, 리포트 탭(board.html)을 최신화한다.

## 입력

- `.ticket-pilot/tickets.json` (특히 done 티켓의 result, blocked 티켓)
- `.ticket-pilot/profile.md` (작업 규칙 R-xx — 제안 선별에 적용)

## 실행 단계

### 1. 후속 제안 (done 티켓의 followups)

1. done 티켓들의 `result.followups`를 모아 중복을 제거한다.
2. 각 후보에 제안 파이프라인을 적용한다 — 출처는 "실제 작업에서 파생된 후속 연쇄"(태그 `[S3·T-xxx 후속]`)다. 필터 5개 중 하나라도 걸리면 탈락:
   - F1 프로필 규칙: 활성 R-xx가 제외하는 계열
   - F2 반려 이력: rejected 티켓과 실질적으로 같은 제안
   - F3 중복: 기존 draft·approved·in_progress 티켓과 중복
   - F4 크기: 1세션 초과 — 첫 단계만 잘라 제안하거나 제외
   - F5 근거 결격: 출처 티켓 ID 또는 "왜 지금" 1줄을 채울 수 없는 후보 (일반론 차단)
3. 통과한 후보를 **대화에 표로만 제안**한다: 제목 · 출처(`[S3·T-xxx 후속]`) · 왜 지금 1줄 · 적용한 R-xx. 상한 3건.
4. **tickets.json에는 기록하지 않는다.** 사용자가 승인한 건만 ticket-create 규칙대로 draft 티켓으로 만든다 (purpose에 출처 태그 접두, steps 마지막 "검증:").

### 2. blocked 요약

blocked 티켓 각각의 사유와 재개 조건을 1줄씩 보고한다. 재개하려면 재승인(approved 복귀)이 필요하다는 안내를 붙인다.

### 3. 리포트 탭 최신화

board.html을 재생성한다:
1. 템플릿 확보 우선순위: (a) 플러그인의 `skills/ticket-create/assets/board.html` → (b) 권한 차단 시 기존 `.ticket-pilot/board.html` 캐리어 → (c) 불가 시 건너뛰고 보고. **임의 작성 금지.**
2. `<script id="tickets-data" type="application/json">…</script>` 내용을 tickets.json 전문으로 교체 (`</` → `<\/`).
3. `.ticket-pilot/board.html` 저장. 리포트 탭은 이 데이터로 done 표(요약·변경 파일·증빙 썸네일·후속 제안)를 그린다.

## 완료 기준

- [ ] 후속 제안이 표(제목·출처 태그·왜 지금·R-xx)로 보고되었고, 승인 전에는 tickets.json에 어떤 기록도 없다
- [ ] blocked 티켓 사유가 보고되었다 (없으면 생략)
- [ ] board.html이 재생성되었다
