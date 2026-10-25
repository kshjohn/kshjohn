# 자기소개 웹페이지 — 배포 & 수정 가이드

이 저장소의 루트에 있는 `index.html` + `profile.js`가 자기소개(포트폴리오/이력서) 웹페이지입니다.
빌드 도구 없이 파일 그대로 동작하므로 GitHub Pages에 올리기만 하면 됩니다.

| 파일 | 역할 | 언제 수정하나 |
|---|---|---|
| `profile.js` | **내용** (이름, 경력, 기술, 프로젝트, 링크…) | 거의 모든 수정은 여기서 |
| `index.html` | 디자인/레이아웃/색상 | 모양을 바꾸고 싶을 때만 |
| `assets/profile.jpg` | 프로필 사진 (없으면 이니셜 표시) | 사진을 넣을 때 |
| `assets/resume.pdf` | 이력서 PDF (없으면 버튼 숨김) | 이력서를 올릴 때 |
| `.nojekyll` | GitHub Pages가 파일을 그대로 서빙하게 함 | 건드리지 않음 |

기능: 한/영 전환(KO/EN 버튼), 라이트/다크 모드, 모바일 반응형, "인쇄 / PDF 저장" 버튼(브라우저 인쇄로 깔끔한 PDF 생성).

---

## 1. 배포하기 (GitHub Pages, 무료)

### 1-1. 코드를 `main` 브랜치에 넣기
이 작업은 `claude/intelligent-ramanujan-2m1zzo` 브랜치에 푸시되어 있습니다.
GitHub에서 Pull Request를 만들어 `main`에 머지하거나, 로컬에서:

```bash
git checkout main
git merge claude/intelligent-ramanujan-2m1zzo
git push origin main
```

### 1-2. Pages 켜기 (최초 1회)
1. GitHub에서 저장소 `kshjohn/kshjohn` 열기 → **Settings** → 왼쪽 메뉴 **Pages**
2. **Build and deployment → Source**: `Deploy from a branch`
3. **Branch**: `main`, 폴더: `/ (root)` → **Save**
4. 1~2분 후 같은 화면 상단에 주소가 표시됩니다.

### 1-3. 주소
- 이 저장소(`kshjohn/kshjohn`)로 배포하면 → **https://kshjohn.github.io/kshjohn/**
- Polska Pulse는 → https://kshjohn.github.io/kshjohn/polska-pulse/

> **더 짧은 주소(https://kshjohn.github.io/)를 원하면** 저장소 이름이 정확히 `kshjohn.github.io`여야 합니다.
> 방법: 새 저장소 `kshjohn.github.io`를 만들고 `index.html`, `profile.js`, `assets/`, `.nojekyll`을 복사해 푸시한 뒤 같은 방식으로 Pages를 켭니다.
> (`kshjohn/kshjohn`은 GitHub 프로필 README용 특수 저장소라 Pages 주소에 저장소 이름이 붙습니다.)

### 1-4. 이후 업데이트
`main`에 푸시할 때마다 자동으로 다시 배포됩니다(보통 1분 내). 별도 작업 없음.

---

## 2. 내용 수정하기

### 가장 쉬운 방법 — GitHub 웹에서 바로 편집
1. 저장소에서 `profile.js` 클릭 → 오른쪽 위 연필 아이콘(Edit)
2. 수정 후 **Commit changes…** → `main`에 직접 커밋
3. 1분 뒤 사이트에 반영

### 로컬에서 편집
```bash
git pull origin main
# profile.js 를 편집기로 수정
open index.html          # 브라우저로 열어 미리보기 (더블클릭해도 됨)
git add profile.js
git commit -m "Update experience"
git push origin main
```

### profile.js 구조
```
settings   공통: 언어 기본값, 사진/이력서 경로, 이메일, 링크, 포인트 색상
en         영어 내용
ko         한국어 내용 (영어와 같은 구조)
  ├ hero         이름, 직함, 태그, 한 줄 소개
  ├ about        소개 문단 + 숫자 하이라이트
  ├ experience   경력 (최신순, end를 ""로 두면 "Present/현재")
  ├ skills       기술 그룹, 자격증, 언어
  ├ projects     프로젝트 (url이 있으면 "View project" 링크 표시)
  ├ education    학력
  └ contact      연락처 문구
```

자주 하는 수정 예시:

- **경력 추가**: `experience.items` 배열 맨 앞에 `{ role, company, location, start, end, bullets: [...] }` 한 덩어리 복사-붙여넣기.
- **섹션 숨기기**: 배열을 비우면(`items: []`) 해당 섹션이 자동으로 사라집니다.
- **프로필 사진**: `assets/profile.jpg`에 정사각형 사진 업로드 (이름이 다르면 `settings.photo` 수정).
- **이력서**: `assets/resume.pdf` 업로드. 필요 없으면 `settings.resume: ""`.
- **포인트 색상**: `settings.accent: "#1f5fbf"` 값 변경.
- **첫 화면 언어**: `settings.defaultLang: "ko"`.

지금 `profile.js`에는 **`Company Name`, `20XX`, `XX%`** 같은 자리표시자가 들어 있으니 실제 값으로 바꿔 주세요.

### 수정 후 화면이 하얗게 나오면
`profile.js` 문법 오류(따옴표·쉼표 누락)가 원인입니다. 브라우저에서 F12 → Console 탭에 오류 줄 번호가 표시됩니다.
