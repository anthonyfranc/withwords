export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  
  // Check if we're on the client side
  const isClient = process.client
  
  // Allow access to public routes
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/verify', '/auth/callback']
  if (publicRoutes.includes(to.path)) {
    return
  }

  // If no user, redirect to login
  if (!user.value) {
    return navigateTo('/auth/login')
  }

  try {
    // Refresh session to get latest user data
    const { data: { session }, error } = await client.auth.getSession()
    
    if (error) throw error

    // If user exists but email is not verified
    if (session?.user && !session.user.email_verified) {
      // Store email in localStorage when redirecting to verify (client-side only)
      if (isClient && session.user.email) {
        localStorage.setItem('verificationEmail', session.user.email)
      }
      
      // Don't redirect if already on verify page
      if (to.path !== '/auth/verify') {
        return navigateTo('/auth/verify')
      }
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    // On error, redirect to login
    return navigateTo('/auth/login')
  }
})