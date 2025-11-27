# 스위치원 프론트엔드

환전 서비스 웹 애플리케이션

## 기술 스택

- **Framework**: Next.js v16 (App Router), React v19
- **Styling**: Tailwind CSS v3
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query) v5
- **HTTP Client**: Axios
- **Testing**: Jest, React Testing Library
- **Code Quality**: ESLint, Prettier

## Path Alias

`@/*`

## 구현 요구사항

### 페이지 구성

1. **로그인 페이지** (`/`)
2. **환율 조회 페이지** (`/exchange-rate`)
3. **환전 내역 페이지** (`/exchange-history`)

### API Fetch

- React Query (useQuery/useMutation)
- Server Action (Next.js)
- Axios (Server Side)

### JWT 인증

- Cookie에 JWT 저장
- Axios에서 Cookie의 토큰을 읽어 API헤더 포함

### 라우트 보호

Next.js Middleware(Proxy) 사용

- 쿠키에 `authToken`이 없으면 `/`로 리다이렉트

### API CORS

Next.js Server Action 사용

## 환경 변수

```env
NEXT_PUBLIC_API_BASE_URL=
```

## 실행 방법

```bash
pnpm install
pnpm dev
```

---

Created by Byungwook Lee
