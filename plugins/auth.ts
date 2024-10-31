export default defineNuxtPlugin(async () => {
  const user = useSupabaseUser()
  const client = useSupabaseClient()

  // Listen for auth state changes
  client.auth.onAuthStateChange((event, session) => {
    user.value = session?.user || null

    // Handle token refresh
    if (event === 'TOKEN_REFRESHED') {
      console.log('Token refreshed')
    }

    // Handle signed out
    if (event === 'SIGNED_OUT') {
      navigateTo('/auth/login')
    }

    // Handle user deleted
    if (event === 'USER_DELETED') {
      navigateTo('/auth/login')
    }
  })
})