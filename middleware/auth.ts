export default defineNuxtRouteMiddleware(async (to) => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()
  
  // Check if user is authenticated
  if (!user.value && !to.path.startsWith('/auth')) {
    return navigateTo('/auth/login')
  }
  
  // Store email in localStorage when user signs in but isn't verified
  if (user.value && !user.value.email_verified) {
    if (process.client) {
      localStorage.setItem('verificationEmail', user.value.email || '')
    }
    if (!to.path.startsWith('/auth/verify')) {
      return navigateTo('/auth/verify')
    }
  }
})