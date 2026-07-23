# _PROGRESS — ticket-pilot 구축 진행표

> **유일한 진행 상태 원본.** 스텝 시작 전 상태를 "진행중"으로 먼저 바꾸고, 완료 시 "완료"로 바꾸며 산출물 경로와 날짜를 기록한다 (00-orchestrator.md §3).
> 상태값: 대기 · 진행중 · 완료 · 보류

| Step | 내용 | 파일 | 상태 | 산출물 | 완료일 |
|------|------|------|------|--------|--------|
| 0.1 | 환경 점검 (Claude Code · /plugin · 데모 프로젝트) | 20-phase-0.md | 완료 | Claude Code 2.1.218 · plugin/marketplace CLI 동작 확인 · demo-project/ | 2026-07-23 |
| 0.2 | [확인 필요] 일괄 질의 | 20-phase-0.md | 완료 (사전 반영) | Q1~Q4 답변 → 01-context.md D-02·06·09·10 | 2026-07-22 |
| 1.1 | 플러그인 골격 생성 (plugin.json name `tp` · 커맨드 4개) | 21-phase-1.md | 완료 | ticket-pilot/ 골격 · 루트 marketplace.json · install+/tp:init 로드 검증 | 2026-07-23 |
| 1.2 | project-setup SKILL.md (스캔 · 인벤토리 · 인터뷰 · 워크스페이스) | 21-phase-1.md | 완료 | skills/project-setup/SKILL.md · 데모 init+재실행 E2E(Opus 4.8) 통과 | 2026-07-23 |
| 2.1 | ticket-create SKILL.md (티켓 규칙 · §4.7 제안 파이프라인 전사) | 22-phase-2.md | 완료 | skills/ticket-create/SKILL.md · 데모 E2E(user 3+suggested 2 draft·태그·시드) | 2026-07-23 |
| 2.2 | board.html 템플릿 (보드 · 리포트 탭 · 저장 UX) | 22-phase-2.md | 완료 | assets/board.html · 크로미움 16/16 통과(사파리 실기기 불가→미지원 시뮬레이션 대체) | 2026-07-23 |
| 2.3 | 보드 변경 반영 처리 (검증 · 관찰 추출) | 22-phase-2.md | 완료 | SKILL.md B모드 · 조작 done 거부+관찰 3건 기록 E2E | 2026-07-23 |
| 2.x | (구축 중 결함 수정) 템플릿 접근 차단 대응 | 22-phase-2.md | 완료 | 재생성 절차에 캐리어 폴백(b)·임의 보드 금지 추가, init이 board.html 초기 생성 | 2026-07-23 |
| 3.1 | ticket-run SKILL.md (실행 프로토콜 · 동시 세션 가드) | 23-phase-3.md | 완료 | skills/ticket-run/SKILL.md · 시나리오 B 1~4 전부 통과(중단 질의·재개 무중복·done/draft 거부) | 2026-07-23 |
| 3.2 | 증빙 수집 규칙 (조건부 캡처 · 상한) | 23-phase-3.md | 완료 | 캡처 가능(T-003 스크린샷 2장·1280px)·불가(T-001/2 diff) 각 검증, 리포트 썸네일 렌더 확인, evidence path/note 형태 명문화 | 2026-07-23 |
| 3.3 | ticket-optimize SKILL.md (후속 제안 · blocked 보고) | 23-phase-3.md | 완료 | skills/ticket-optimize/SKILL.md · run 종료 후 표 제안(승인 전 미기록)·의존성 막힘 보고 확인 | 2026-07-23 |
| 4.1 | day-close SKILL.md (RECENT 기록 · 승격 · C-xx 동기화 · 신뢰 예산) | 24-phase-4.md | 진행중 | | |
| 4.2 | memory-optimize SKILL.md (3계층 압축) | 24-phase-4.md | 대기 | | |
| 4.3 | 반복 패턴 → 스킬 제안 (day-close 내 절차) | 24-phase-4.md | 대기 | | |
| 4.4 | SessionStart 훅 | 24-phase-4.md | 보류 (v1 제외) | | |
| 5.1 | README (설치 3경로 · 사용법 · 제약) | 25-phase-5.md | 대기 | | |
| 5.2 | E2E 검증 (시나리오 A~F 전체) | 25-phase-5.md | 대기 | | |
| 5.3 | 버전 태그 v0.1.0 · 인수 (S1~S8 보고) | 25-phase-5.md | 대기 | | |
