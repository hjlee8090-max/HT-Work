# Phase 0 — 사전 확인 (구현 없음) · 구축 실행 파일 1/6
> 구축: Claude Fable 5 (Claude Code) · 산출물의 런타임 독자: Claude Opus 4.8
> 선행: 없음 (첫 실행 파일) · 규칙: 00-orchestrator.md · 참조: 01-context.md / 10-contracts.md(§3·§4) / 30-test-scenarios.md

---

### Phase 0 — 사전 확인 (구현 없음)

**Step 0.1 환경 점검**
- 작업: Claude Code 버전 확인, `/plugin` 명령 지원 여부, 로컬 마켓플레이스 등록 가능 여부 확인. 데모용 소형 웹 프로젝트 1개 준비 (정적 HTML/JS 수준이면 충분).
- DoD: 버전 기록 완료. `/plugin marketplace add <로컬경로>` 동작 확인.

**Step 0.2 [확인 필요] 항목 일괄 질의 — 완료** (4건 모두 §2에 확정 반영. Step 0.1 완료 후 바로 Phase 1 착수)
- Q1 (D-02) 답변 완료(7/22): 클립보드 반영 기본 + 크로미움 직접 저장 향상 → [확정]
- Q2 (D-06) 답변 완료(7/22): 웹 프로젝트만 자동 캡처, 그 외 diff·산출물 링크 대체 → [확정]. 캡처 수단이 없으면 설치를 제안하되, 설치·캡처 실패는 티켓 실패로 이어지지 않는다 (Step 3.2 규칙 유지)
- Q3 (D-10) 답변 완료(7/22): plugin.json name `tp` → 커맨드 `/tp:*`. 저장소·작업 폴더 이름은 ticket-pilot 유지 → [확정]
- Q4 (D-09) 답변 완료(7/22): `.ticket-pilot/` 전체 커밋(artifacts 포함) → [확정]. 용량 완화 규칙은 Step 3.2·W-5


---

## Phase 종료 절차
1. _PROGRESS.md에서 이 Phase의 Step을 모두 "완료"로 바꾸고 산출물 경로를 기록한다.
2. 사용자에게 보고하고 승인을 기다린다: "Phase 0 완료 — 산출물: … / 검증: … / 다음: 21-phase-1.md"
