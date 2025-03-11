type Routes = {
  HOME: string;
  SIGN_UP: string;
  SIGN_IN: string;
  DEMO: string;
  DASHBOARD: string;
  PROFILE: string;
  SEARCH: string;
  APPLICATIONS: string;
  INTERVIEWS: string;
  FORGOT_PASSWORD: string;
  getRoute: (route: keyof Omit<Routes, 'getRoute' | 'getAuthenticatedRoute' | 'isProtectedRoute' | 'isPublicRoute' | 'getRedirectPath'>) => string;
  getAuthenticatedRoute: (isAuthenticated: boolean) => string;
  isProtectedRoute: (path: string) => boolean;
  isPublicRoute: (path: string) => boolean;
  getRedirectPath: (isAuthenticated: boolean, currentPath: string) => string;
}

const ROUTES: Routes = {
  // Pages publiques
  HOME: '/',
  SIGN_UP: '/auth/signup',
  SIGN_IN: '/auth/signin',
  DEMO: '/demo',
  FORGOT_PASSWORD: '/forgot-password',

  // Pages protégées
  DASHBOARD: '/dashboard/dashboard',
  PROFILE: '/profile',
  SEARCH: '/search',
  APPLICATIONS: '/applications',
  INTERVIEWS: '/interviews',

  // Méthodes
  getRoute(route) {
    return ROUTES[route];
  },

  getAuthenticatedRoute(isAuthenticated) {
    return isAuthenticated ? this.DASHBOARD : this.SIGN_IN;
  },

  isProtectedRoute(path) {
    const protectedRoutes = [
      this.DASHBOARD,
      this.PROFILE,
      this.APPLICATIONS,
      this.INTERVIEWS
    ];
    return protectedRoutes.includes(path);
  },

  isPublicRoute(path) {
    const publicRoutes = [
      this.HOME,
      this.SIGN_IN,
      this.SIGN_UP,
      this.DEMO
    ];
    return publicRoutes.includes(path);
  },

  getRedirectPath(isAuthenticated, currentPath) {
    if (!isAuthenticated && this.isProtectedRoute(currentPath)) {
      return this.SIGN_IN;
    }
    if (isAuthenticated && [this.SIGN_IN, this.SIGN_UP].includes(currentPath)) {
      return this.DASHBOARD;
    }
    return currentPath;
  }
};

export default ROUTES; 