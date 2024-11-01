export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  
  // Check if we're on the client side
  const isClient = process.client

  // Allow access to public routes - make sure paths exactly match
  const publicRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/verify',
    '/auth/callback',
    '/',
    '/pricing',
    '/terms',
    '/contact'
  ]

  // Check if the current route is public and return immediately if it is
  if (publicRoutes.includes(to.path) || to.path.startsWith('/auth/')) {
    return
  }

  // Wait until the user session is fully loaded
  await user.value // Ensures the user is fetched before proceeding

  // If no user, redirect to login
  if (!user.value) {
    return navigateTo('/auth/login')
  }

  try {
    // Refresh session to get the latest user data
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
