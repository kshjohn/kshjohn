# 🇵🇱 Polska Pulse

**폴란드 20–40대가 지금 관심 갖는 시사·이슈를 한 화면에서 트래킹하는 웹앱**
A single-file web app that tracks what Polish people aged 20–40 are paying attention to right now.

## What it does

- **토픽별 언급량 차트** — 폴란드 주요 언론 헤드라인을 10개 관심 영역(정치·선거, 주거·부동산, 경제·물가, 안보·우크라이나, 일·커리어, 기술·AI, 건강·심리, 기후·에너지, 문화·엔터, 스포츠)으로 키워드 분류해 언급량을 시각화. 토픽 클릭 시 헤드라인 필터링.
- **통합 헤드라인 피드** — TVN24 · Polsat News · Bankier.pl · RMF24 · Interia Fakty RSS + reddit **r/Polska** 인기글을 병합, 중복 제거 후 최신순 정렬.
- **위키피디아 트렌딩** — Wikimedia Pageviews API로 폴란드어 위키피디아 일간 조회수 상위 문서 표시. 폴란드인들이 "지금 찾아보는 것"의 근사 지표.
- **세대 스냅샷** — 공개 여론조사·통계(CBOS, GUS, Eurostat 등)에서 반복 확인되는 20–40대의 관심 경향 요약 카드. 각 카드에 관련 폴란드어 핵심 어휘 + 한국어 뜻 포함 (폴란드어 학습 겸용).

## How it works

- 의존성 없는 단일 `index.html` (vanilla JS) — 빌드 불필요, GitHub Pages에서 바로 동작.
- 모든 수집은 **브라우저에서 직접** 수행되며 서버에 아무것도 저장하지 않음. RSS는 공개 CORS 프록시(allorigins.win) 경유, Reddit/Wikimedia는 직접 호출.
- 마지막 수집 결과를 `localStorage`에 캐시해 오프라인/소스 장애 시에도 표시.
- 라이트/다크 테마 (시스템 설정 따름 + 수동 토글).

## Run it

```bash
# 로컬에서
open polska-pulse/index.html   # 또는 브라우저로 파일 열기
```

GitHub Pages 배포: 저장소 **Settings → Pages → Deploy from a branch**에서 브랜치와 `/ (root)`를
선택하면 `https://kshjohn.github.io/polska-pulse/` 에서 접속 가능.
(프로필 저장소 `kshjohn/kshjohn`는 사용자 사이트로 배포되어 저장소 이름이 경로에 붙지 않습니다.)

## Notes & limitations

- 토픽 분류는 폴란드어 어간 키워드 매칭 기반의 **근사치**입니다.
- RSS 소스가 주소를 바꾸거나 프록시가 막히면 해당 소스만 실패 표시(●)되고 나머지는 정상 동작합니다. 소스 목록은 `index.html`의 `FEEDS` 배열에서 수정할 수 있습니다.
- 세대 스냅샷은 정적 요약이며 실시간 데이터가 아닙니다.
