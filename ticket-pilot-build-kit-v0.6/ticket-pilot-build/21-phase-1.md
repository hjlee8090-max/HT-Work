# Phase 1 — 플러그인 골격 + init · 구축 실행 파일 2/6
> 구축: Claude Fable 5 (Claude Code) · 산출물의 런타임 독자: Claude Opus 4.8
> 선행: Phase 0 완료 (_PROGRESS.md 확인) · 규칙: 00-orchestrator.md · 참조: 01-context.md / 10-contracts.md(§3·§4) / 30-test-scenarios.md
> 런타임 자족성: 이 Phase의 산출물에 구축 문서 참조를 남기지 않는다 — 필요한 계약은 본문에 전사한다 (00 §2)

---

### Phase 1 — 플러그인 골격 + init

**Step 1.1 골격 생성**
- 작업: §3.1 구조대로 디렉터리 생성. plugin.json 작성 — name `tp`, version 0.1.0, description에 표시명 "Ticket Pilot" 포함. 설치된 다른 플러그인과 이름 충돌 여부 확인. marketplace.json 작성. 커맨드 4개는 "해당 스킬(SKILL.md)을 읽고 그 절차를 그대로 실행하라"는 1~3줄 래퍼로 작성.
- 산출물: 저장소 골격 일체
- DoD: 로컬 마켓플레이스 등록 → `/plugin install tp` 성공 → `/tp:init` 입력 시 스킬 본문이 로드됨 (동작이 비어 있어도 됨).

**Step 1.2 project-setup SKILL.md 작성**
- SKILL.md에 반드시 담을 절차:
  - (a) **프로젝트 스캔**: 루트 구조 2단계, README·package.json 등 핵심 파일 파악. .gitignore 존중. 파일 300개 초과 시 요약 스캔으로 전환.
  - (b) **기존 스킬 인벤토리**: `<프로젝트>/.claude/skills/`, `~/.claude/skills/`, 설치된 다른 플러그인 스킬의 name + description을 수집한다. 결과는 대화로 보고하고 인터뷰에 활용한다. 본 플러그인 트리거와 겹치는 문구(예: 사용자가 이미 쓰는 "하루 마감" 계열 스킬)가 있으면 **충돌 목록을 사용자에게 보고**한다.
  - (c) **목적 인터뷰**: 스캔으로 추정 가능한 항목은 추정치를 제시하고 확인만 받는다. 질문은 목적·사용자·성공 기준 3개를 넘기지 않는다.
  - (d) **산출**: CLAUDE.md 관리 블록(§4.4) 작성, `.ticket-pilot/` 초기 파일 일체 생성 (config.json, 빈 tickets.json, 빈 memory 3파일, 빈 profile.md 템플릿, artifacts/ 폴더). 전체 커밋 정책(D-09)이므로 .gitignore 항목은 만들지 않는다. 단, 원격 공유 저장소가 감지되면 profile.md의 커밋 제외 여부를 사용자에게 확인한다 (W-6).
- DoD: 데모 프로젝트에서 init 실행 → CLAUDE.md 블록 60줄 이하, `.ticket-pilot/` 전 파일 생성, 스킬 인벤토리가 대화에 보고됨. **init 재실행 시 마커 블록만 갱신되고 사용자 작성 부분이 보존됨.**


---

## Phase 종료 절차
1. _PROGRESS.md에서 이 Phase의 Step을 모두 "완료"로 바꾸고 산출물 경로를 기록한다.
2. 사용자에게 보고하고 승인을 기다린다: "Phase 1 완료 — 산출물: … / 검증: … / 다음: 22-phase-2.md"
