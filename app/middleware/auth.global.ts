import { defu } from 'defu'

type MiddlewareOptions = false | {
  /**
   * Only apply auth middleware to guest or user
   */
  only?: 'guest' | 'user'
  /**
   * Redirect authenticated user to this route
   */
  redirectUserTo?: string
  /**
   * Redirect guest to this route
   */
  redirectGuestTo?: string
}

declare module '#app' {
  interface PageMeta {
    auth?: MiddlewareOptions
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: MiddlewareOptions
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.meta?.auth === false) {
    return;
  }

  const { loggedIn, options, fetchSession } = useAuth();
  const {
    only,
    redirectUserTo = '/dashboard',
    redirectGuestTo = '/login', // Default fallback
  } = defu(to.meta?.auth, options);

  // Fetch session for client-side navigation
  if (import.meta.client) {
    await fetchSession();
  }

  // Handle guest-specific logic
  if (only === 'guest') {
    if (loggedIn.value) {
      // Redirect authenticated users away from guest-only routes
      if (to.path !== redirectUserTo) {
        return navigateTo(redirectUserTo);
      }
    } else {
      // Allow guests to access the current route
      return;
    }
  }

  // Handle user-specific logic (if needed in your app)
  if (!loggedIn.value && to.path !== redirectGuestTo) {
    return navigateTo(redirectGuestTo);
  }
});