# Suno Prompter Suite — 배포 가이드

Style Prompter + Lyrics Prompter를 웹에서 누구나 사용할 수 있도록 Vercel에 배포하는 가이드입니다.

---

## 사전 준비

1. **Anthropic API 키** — https://console.anthropic.com/ 에서 발급
2. **Vercel 계정** — https://vercel.com/ 에서 무료 가입 (GitHub 계정으로 로그인 권장)
3. **Node.js** — https://nodejs.org/ 에서 LTS 버전 설치 (로컬 테스트용)

---

## 방법 1: Vercel CLI로 배포 (가장 간단)

### 1단계: Vercel CLI 설치
터미널(명령 프롬프트)을 열고:
```bash
npm install -g vercel
```

### 2단계: 이 폴더에서 배포
이 프로젝트 폴더로 이동 후:
```bash
cd suno-prompter-deploy
vercel
```
처음 실행 시 로그인하라고 나옴 → 브라우저에서 로그인

질문이 나오면:
- Set up and deploy? → **Y**
- Which scope? → 기본값 Enter
- Link to existing project? → **N**
- Project name? → **suno-prompter** (원하는 이름)
- In which directory is your code? → **./** (Enter)
- Override settings? → **N**

### 3단계: API 키 설정
배포 후 Vercel 대시보드 (https://vercel.com/dashboard) 에서:
1. 방금 만든 프로젝트 클릭
2. **Settings** 탭 → **Environment Variables**
3. 추가:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-xxxxx...` (네 API 키)
   - Environment: **Production** 체크
4. **Save** 클릭

### 4단계: 재배포
환경변수가 반영되려면 재배포 필요:
```bash
vercel --prod
```

### 완료!
터미널에 나온 URL (예: `https://suno-prompter-xxxx.vercel.app`)이 네 앱 주소.
이 URL을 공유하면 누구나 브라우저에서 바로 사용 가능.

---

## 방법 2: GitHub 연동 배포 (자동 업데이트)

### 1단계: GitHub에 레포지토리 생성
1. https://github.com/new 에서 새 레포 생성
2. 이 폴더의 파일들을 전부 업로드

### 2단계: Vercel에서 Import
1. https://vercel.com/new 접속
2. **Import Git Repository** → GitHub 레포 선택
3. Framework: **Vite** 자동 감지됨
4. **Deploy** 클릭

### 3단계: API 키 설정
방법 1의 3단계와 동일

### 장점
코드를 수정하고 GitHub에 push하면 Vercel이 자동으로 재배포해줌.

---

## 로컬에서 테스트하기

```bash
cd suno-prompter-deploy
npm install
```

`.env.example`을 `.env`로 복사하고 API 키 입력:
```bash
cp .env.example .env
# .env 파일을 열어서 API 키 입력
```

실행:
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` 접속

> 주의: 로컬에서는 `/api/generate` 서버리스 함수가 안 됨.
> 로컬 테스트는 `vercel dev` 명령어를 사용하면 API 함수도 작동함:
> ```bash
> vercel dev
> ```

---

## 프로젝트 구조

```
suno-prompter-deploy/
├── api/
│   └── generate.js          ← Claude API 프록시 (API 키 숨김)
├── src/
│   ├── main.jsx              ← 앱 진입점
│   ├── App.jsx               ← 탭 네비게이션 (Style / Lyrics)
│   ├── StylePrompter.jsx     ← Style 프롬프터 (123개 장르 DB 내장)
│   └── LyricsPrompter.jsx    ← Lyrics 프롬프터 (구조 빌더)
├── public/                    ← 정적 파일
├── index.html                 ← HTML 템플릿
├── package.json               ← 의존성
├── vite.config.js             ← Vite 설정
├── vercel.json                ← Vercel 설정
├── .env.example               ← 환경변수 예시
└── README.md                  ← 이 파일
```

---

## 비용 참고

- **Vercel**: 무료 티어로 충분 (월 100GB 대역폭, 서버리스 함수 포함)
- **Claude API**: Opus 4.6 기준 1회 생성 약 50원. 월 사용량에 따라 다름.
- Anthropic 콘솔에서 월 상한(spending limit) 설정 가능
