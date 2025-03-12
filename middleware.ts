import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import ROUTES from '@/app/utils/routes';

export function middleware(request: NextRequest) {
  // Vérifier le token d'authentification dans les cookies
  const authToken = request.cookies.get('auth_token')?.value;
  const firebaseToken = request.cookies.get('firebase_token')?.value;
  const isAuthenticated = !!authToken && !!firebaseToken;
  
  const path = request.nextUrl.pathname;
  
  // Liste des routes publiques (ne nécessitant pas d'authentification)
  const publicRoutes = [
    ROUTES.SIGN_IN,
    ROUTES.SIGN_UP,
    ROUTES.FORGOT_PASSWORD,
    '/'
  ];

  const isPublicRoute = publicRoutes.includes(path);
  const isAuthRoute = path.startsWith('/auth/');

  console.log('Middleware check:', {
    path,
    isAuthenticated,
    isPublicRoute,
    isAuthRoute,
    authToken: !!authToken,
    firebaseToken: !!firebaseToken
  });

  // Redirection pour les utilisateurs non authentifiés
  if (!isAuthenticated && !isPublicRoute && !isAuthRoute) {
    console.log('Utilisateur non authentifié, redirection vers login');
    return NextResponse.redirect(new URL(ROUTES.SIGN_IN, request.url));
  }

  // Redirection pour les utilisateurs authentifiés essayant d'accéder aux pages d'auth
  if (isAuthenticated && (isPublicRoute || isAuthRoute)) {
    console.log('Utilisateur authentifié, redirection vers dashboard');
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
    '/profile/:path*',
    '/search/:path*',
    '/applications/:path*',
    '/interviews/:path*',
    '/auth/:path*',
  ],
};