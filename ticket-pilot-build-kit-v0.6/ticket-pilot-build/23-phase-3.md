# Phase 3 — 실행 + 리포트 · 구축 실행 파일 4/6
> 구축: Claude Fable 5 (Claude Code) · 산출물의 런타임 독자: Claude Opus 4.8
> 선행: Phase 2 완료 (_PROGRESS.md 확인) · 규칙: 00-orchestrator.md · 참조: 01-context.md / 10-contracts.md(§3·§4) / 30-test-scenarios.md
> 런타임 자족성: 이 Phase의 산출물에 구축 문서 참조를 남기지 않는다 — 필요한 계약은 본문에 전사한다 (00 §2)

---

### Phase 3 — 실행 + 리포트

**Step 3.1 ticket-run SKILL.md 작성**
- 실행 프로토콜 [확정]:
  1. tickets.json 로드. `in_progress` 티켓이 이미 있으면: 이어서 재개할지 blocked로 돌릴지 **사용자에게 질의**한다 (자동 결정 금지 — 직전 세션 중단 복구 상황)
  1-1. 동시 세션 가드 [유력안, W-10]: 상태를 저장하기 직전 tickets.json의 updated_at을 로드 시점 값과 비교하고, 달라져 있으면 다른 세션의 변경으로 판단해 실행을 중단하고 보고한다. v1은 "실행(run) 세션은 동시에 1개"를 전제한다
  2. 다음 티켓 선택: `status=approved` AND depends_on 전부 done, priority 오름차순
  3. 선택 즉시 `in_progress` + updated_at 기록 후 **저장하고 나서** 실행 시작
  4. steps 순서대로 실행. 마지막 "검증:" 단계 통과를 확인
  5. `done` + result(§4.1) 기록·저장 → 증빙 수집(Step 3.2) → board.html 재생성
  6. approved 소진까지 2~5 반복 → ticket-optimize 호출 → 요약 보고
  - 실행 중 티켓 범위 밖 작업이 필요해지면: **하지 않는다.** result.followups에 기록만 한다 [확정]
- DoD: §6 시나리오 B 전체 통과.

**Step 3.2 증빙 수집 규칙** (ticket-run SKILL.md 내)
- `config.screenshot=auto` AND 웹 프로젝트 AND 캡처 수단 존재(Playwright 등) → 결과 화면을 `artifacts/T-XXX/`에 저장하고 evidence에 기록. 티켓당 최대 2장, PNG 폭 1280px 이하 (D-09 전체 커밋 정책에 따른 용량 상한)
- 불가하면 evidence를 `diff`(변경 요약) 또는 `file`(산출물 경로)로 대체. **캡처 실패가 티켓 실패로 이어지지 않는다** [확정]
- DoD: 캡처 가능 환경과 불가 환경 각 1회 실행, 리포트 탭에 증빙이 표시됨.

**Step 3.3 ticket-optimize SKILL.md 작성**
- 절차: done 티켓들의 result를 검토하여
  - (a) followups를 모아 중복 제거 후 §4.7 파이프라인(S3 출처)을 거쳐 suggested 티켓 초안을 **대화에 표로 제안** (tickets.json 기록은 사용자 승인 후)
  - (b) blocked 티켓의 사유와 재개 조건을 요약 보고
  - (c) 리포트 탭 데이터 최신화 (board.html 재생성)
- DoD: run 종료 후 후속 제안이 대화에 보고되고, 승인 전에는 tickets.json에 기록되지 않음.


---

## Phase 종료 절차
1. _PROGRESS.md에서 이 Phase의 Step을 모두 "완료"로 바꾸고 산출물 경로를 기록한다.
2. 사용자에게 보고하고 승인을 기다린다: "Phase 3 완료 — 산출물: … / 검증: … / 다음: 24-phase-4.md"
