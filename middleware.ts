import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import ROUTES from '@/app/utils/routes';

export function middleware(request: NextRequest) {
  // Vérifier le token d'authentification dans les cookies
  const token = request.cookies.get('auth_token')?.value;
  const isAuthenticated = !!token;
  
  const path = request.nextUrl.pathname;
  
  // Utiliser les fonctions utilitaires de ROUTES
  if (ROUTES.isProtectedRoute(path) && !isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
  }

  if (ROUTES.isPublicRoute(path) && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/search/:path*',
    '/applications/:path*',
    '/interviews/:path*',
    '/auth/:path*',
  ],
}; 