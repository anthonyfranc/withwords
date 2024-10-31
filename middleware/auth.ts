export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  
  // Check if we're on the client side
  const isClient = process.client
  
  // Allow access to public routes
  const publicRoutes = ['/auth/login', '/auth/register', '/auth/verify', '/auth/callback', '/', '/pricing', '/terms']
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

    // Check if email is confirmed using email_confirmed_at
    if (session?.user && !session.user.email_confirmed_at && to.path !== '/auth/verify') {
      if (isClient && session.user.email) {
        localStorage.setItem('verificationEmail', session.user.email)
      }
      return navigateTo('/auth/verify')
    }
  } catch (error) {
    console.error('Auth middleware error:', error)
    return navigateTo('/auth/login')
  }
})