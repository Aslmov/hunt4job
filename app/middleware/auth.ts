import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import ROUTES from '@/app/utils/routes';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth-token');
  const path = request.nextUrl.pathname;
  
  const redirectPath = typeof ROUTES.getRedirectPath === 'function' 
    ? ROUTES.getRedirectPath(isAuthenticated, path)
    : path;
  
  if (redirectPath !== path) {
    return NextResponse.redirect(new URL(redirectPath, request.url));
  }
  
  return NextResponse.next();
} 