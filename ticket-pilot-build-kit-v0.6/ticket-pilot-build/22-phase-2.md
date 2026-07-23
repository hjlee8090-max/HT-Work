# Phase 2 — 티켓 생성 + 보드 · 구축 실행 파일 3/6
> 구축: Claude Fable 5 (Claude Code) · 산출물의 런타임 독자: Claude Opus 4.8
> 선행: Phase 1 완료 (_PROGRESS.md 확인) · 규칙: 00-orchestrator.md · 참조: 01-context.md / 10-contracts.md(§3·§4) / 30-test-scenarios.md
> 런타임 자족성: 이 Phase의 산출물에 구축 문서 참조를 남기지 않는다 — 필요한 계약은 본문에 전사한다 (00 §2)

---

### Phase 2 — 티켓 생성 + 보드

**Step 2.1 ticket-create SKILL.md 작성**
- 사용자 요청 티켓 규칙 (SKILL.md에 명문화):
  - 티켓 1건 = 1세션 안에 완료 가능한 크기. 넘치면 분할하고 depends_on으로 연결
  - steps 마지막은 반드시 "검증:" (§4.1). steps는 하위 모델이 추가 맥락 없이 수행 가능한 수준으로 쓴다 (§4.4 작업 규칙 2)
  - 기존 스킬로 처리 가능한 티켓은 steps에 해당 스킬명을 명시
  - **목적 정합 확인** [유력안, D-22]: 요청이 CLAUDE.md의 목적·성공 기준과 연결되지 않으면 생성 전에 1회 확인한다 — 목적을 갱신할지, 목적 외 작업으로 표시하고 진행할지
  - **프로필 반영(§4.6)**: profile.md의 규칙을 티켓 크기·steps 상세도·suggested 선별에 적용하고, 적용한 규칙 ID를 제안 문구에 인용한다. 프로필이 비어 있으면 §4.6의 시드 절차(지식파일 참조 제안 또는 3문항 이내 질문)를 먼저 수행한다
- **연계 제안**: §4.7 파이프라인(후보 수집 → 필터 → 랭킹 → 근거 명시)을 그대로 실행한다. 상한 3건(신뢰 예산 적용 시 1건), purpose에 출처 태그 접두. 모든 신규 티켓은 draft로 생성한다. 자동 승인 금지 [확정]
- DoD: 데모에서 "OO 기능 티켓 만들어줘" → user 티켓 + suggested 3건 이하가 draft로 tickets.json에 기록되고, suggested 전건의 purpose에 §4.7 출처 태그가 있으며, board.html이 재생성됨.

**Step 2.2 board.html 템플릿 구현** (`skills/ticket-create/assets/board.html`)
- §4.2 계약 전체를 구현한다. 완성 판정 체크리스트:
  - [ ] 4컬럼 보드, 카드에 title / purpose / steps / priority 표시
  - [ ] 승인·반려·편집·되돌리기 동작. in_progress·done 카드는 읽기 전용
  - [ ] "변경 반영" → 클립보드 복사 + 안내 문구 표시
  - [ ] showSaveFilePicker 가능 환경에서만 "파일로 저장" 노출·동작
  - [ ] 리포트 탭 표 + 증빙 썸네일(상대경로) 렌더링
  - [ ] 외부 네트워크 요청 0건 (개발자도구 Network 탭으로 확인)
- DoD: 크롬과 사파리에서 각각 열어 저장 경로 확인 (사파리는 클립보드 경로만 동작하면 정상).

**Step 2.3 "보드 변경 반영" 처리 규칙 추가** (ticket-create SKILL.md 내)
- 붙여넣은 JSON 검증: schema_version 일치, 티켓 id 존재, §4.2 무결성 규칙에 맞는 상태 전환만 수용. 위반 시 어떤 항목이 왜 거부됐는지 보고하고 반영하지 않는다.
- 관찰 추출(§4.6): 반영 처리 시(보드 붙여넣기와 채팅 승인 경로 모두) 변경 전후 diff에서 관찰을 profile.md 관찰 로그에 1줄씩 기록한다 — suggested 반려/승인, steps 수 편집, 우선순위 변경 등. 이 단계에서 해석은 붙이지 않는다. 패턴·규칙 승격은 day-close의 몫이다.
- DoD: 조작된 JSON(임의로 status=done 지정)을 붙여넣는 테스트에서 거부됨. 정상 반려 반영 시 profile.md 관찰 로그에 기록이 남음.


---

## Phase 종료 절차
1. _PROGRESS.md에서 이 Phase의 Step을 모두 "완료"로 바꾸고 산출물 경로를 기록한다.
2. 사용자에게 보고하고 승인을 기다린다: "Phase 2 완료 — 산출물: … / 검증: … / 다음: 23-phase-3.md"
