# 🇵🇱 Polski A1–C1 · 폴란드어 자습실 (로컬 버전)

**한국어 사용자를 위한 폴란드어 자습 프로그램.** 단어장 9천여 개, 7격·어미 변화표, 문법 레슨 39개, 숫자·시간, 훈련·퀴즈·모의고사, 말하기·쓰기까지 한 파일(`index.html`)에 들어 있습니다. 빌드도 설치도 필요 없습니다.

Claude 뷰어에서 쓰던 아티팩트와 같은 내용이며, 로컬에서는 Claude 채점만 빠지고 나머지는 전부 그대로 돌아갑니다.

## 실행

```bash
# 가장 간단히 — 파일을 브라우저로 열기 (Chrome · Edge · Safari)
open polski-a1-c1/index.html

# 권장 — 로컬 서버로 열기 (마이크·음성 인식이 안정적이고, 진도가 파일로 자동 저장됨)
#   Mac: local/start.command 더블클릭   ·   Windows: local/start.bat 더블클릭
#   또는 터미널에서
cd polski-a1-c1
python3 local/serve.py          # http://localhost:8765 가 자동으로 열립니다
```

GitHub Pages 로 배포하면 `https://kshjohn.github.io/polski-a1-c1/` 에서도 열립니다.

## 진도 저장

| 여는 방법 | 저장 위치 |
|---|---|
| `local/start.command`(Mac) · `local/start.bat`(Windows) 더블클릭, 또는 `python3 local/serve.py` | 이 Mac 의 파일 `local/data/progress.json` 에 **자동 저장** (날짜별 사본 60일 보관). 브라우저 데이터를 지워도 남습니다. |
| `index.html` 을 파일로 열기 (file://) / GitHub Pages | 그 브라우저의 localStorage 에만. `local/data` 에는 파일이 생기지 않습니다. |

홈 화면 **진도 저장** 카드의 버튼:
- **진도 파일로 저장** — 지금 진도를 `polski-progress-YYYY-MM-DD.json` 으로 내려받습니다. 서버 없이 파일로 열었을 때 쓰세요. `local/data/progress.json` 과 같은 형식입니다.
- **진도 파일 불러오기** — 그 .json(또는 `local/data/progress.json`)을 골라 **합치기**(합집합, 권장) 또는 **덮어쓰기**.
- **백업 코드 만들기 → 코드로 불러오기** — 한 줄 코드로 Claude 뷰어와 주고받을 때.

> **주의** — file:// 로 열 때와 localhost 로 열 때는 브라우저 저장소가 서로 다릅니다. 파일로 열어 공부하다가 서버로 바꾸면 진도가 비어 보이는데, 사라진 게 아니라 다른 저장소에 있는 것입니다. 바꾸기 전에 '진도 파일로 저장' 해 두고 새 쪽에서 '불러오기 → 합치기' 하세요.

## 숫자 탭 보강 (2026-11-09)

- **서수 — 백만 번째까지**: 1–1000 서수표, 천·만·백만 번째(`dwutysięczny`, `stutysięczny`, `milionowy`), 합성 서수 규칙(끝 두 자리만 서수: `sto dwudziesty piąty`, `tysiąc dziewięćset osiemdziesiąty piąty`), 서수의 7가지 격·성 꼴. 표는 손으로 적지 않고 규칙 엔진이 만듭니다.
- **서수 연습**(새 모드): 층·순위·연도·세기·시각·날짜 문장의 빈칸에 맞는 격·성을 고릅니다. 보기에 같은 수의 다른 격, 기수, 앞부분까지 서수로 바꾼 꼴(`setny dwudziesty piąty`)이 섞여 나옵니다.
- **숫자 + 명사 연습을 더 어렵게**: 문제에 격 이름을 보여 주지 않고, 보기는 언제나 주격 단수 · 주격 복수 · 속격 복수 세 꼴 + 성 함정(`dwa/dwie`, `jeden/jedna`). 12–14 · 21 · 22–24 · 112 같은 함정 수를 주로 내고, 셋에 하나는 명사 꼴(`___ koty`)을 보고 수를 고르는 역문제입니다.

## 이번에 추가된 것 (2026-10-17)

**격 탭 → 격 변화 심화**
- 형용사 + 명사 구 변화표 — `ten nowy dom`, `ta nowa książka`, `mój starszy brat` 등 8개 구를 단수·복수 7격으로, 예문·발음 포함
- 동사의 격 지배 — 속격·여격·대격·조격·전치격 구문 동사 80여 개, 예문과 한국어 함정 메모
- 격이 둘인 전치사 — `na pocztę ↔ na poczcie`, `za tydzień ↔ za domem` 등 방향/위치 대조표
- 지시·소유·관계대명사 — `ten · mój · nasz · który · kto/co` 전체 변화표
- 자음·모음 교체 — `miasto → mieście`, `stół → stole` 가 왜 그렇게 되는지
- 속격 -a / -u 판별, 남성인간 복수의 네 가지 어미, 수사(1 · 2–4 · 5+)와 격
- **격 말하기 연습** — 한국어 뜻을 보고 격이 맞는 문장을 말하면 음성 인식이 단어마다 확인

**말하기 탭 → 말하기 연습** (Claude 없이 브라우저 음성·음성 인식만으로)
- 따라 말하기 — 레벨별 예문을 듣고 따라 말하기, 단어별 인식 결과 표시
- 질문에 답하기 — A1~C1 질문 28개. 자유 발화를 받아 적고 핵심 표현·길이를 확인, 모범 답안과 비교
- 상황 대화 — 시험 세트 12개의 역할극을 상대역 음성과 한 줄씩 주고받기
- 격 말하기 — 위 격 연습으로 바로 이동

## 음성 기능

- 🔊 는 브라우저 내장 폴란드어 음성(TTS)을 씁니다. macOS 는 **시스템 설정 → 손쉬운 사용 → 말하기 콘텐츠 → 시스템 음성 → 관리** 에서 폴란드어(Zosia 등)를 내려받으면 소리가 훨씬 좋습니다.
- 🎤 는 브라우저 음성 인식(Web Speech API, `pl-PL`)을 씁니다. Chrome · Edge · Safari 에서 동작하며 인식 자체는 브라우저 제공사의 서버를 거칩니다. Firefox 는 지원하지 않아 듣기만으로 진행됩니다.

## 파일

```
polski-a1-c1/
├── index.html        # 프로그램 전체 (단일 파일)
├── README.md
└── local/
    ├── start.command # Mac: 더블클릭으로 서버 실행
    ├── start.bat     # Windows: 더블클릭으로 서버 실행
    ├── serve.py      # 로컬 서버 + 진도 파일 저장 (표준 라이브러리만 사용)
    └── data/         # 진도 파일 (git 에 올리지 않음)
```
