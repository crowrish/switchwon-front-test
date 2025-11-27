import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = ['/exchange-rate', '/exchange-history'];

export function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  // 로그인 페이지는 인증 불필요
  if (pathname === '/') {
    return NextResponse.next();
  }

  // 보호된 경로: 토큰 없으면 로그인 페이지로 리다이렉트
  if (PROTECTED_ROUTES.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 미들웨어를 적용할 경로 설정
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|icon.svg).*)',
  ],
};
