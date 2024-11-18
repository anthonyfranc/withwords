import { defu } from 'defu'
import { createAuthClient } from 'better-auth/client'
import type {
  InferSessionFromClient,
  InferUserFromClient,
  ClientOptions,
} from 'better-auth/client'
import type { RouteLocationRaw } from 'vue-router'

interface RuntimeAuthConfig {
  redirectUserTo: RouteLocationRaw | string
  redirectGuestTo: RouteLocationRaw | string
}

export function useAuth() {
  const url = useRequestURL()
  const headers = import.meta.server ? useRequestHeaders() : undefined
  const loading = ref(false)
  const error = ref<string | null>(null)

  const client = createAuthClient({
    baseURL: url.origin,
    fetchOptions: {
      headers,
    },
  })

  const options = defu(useRuntimeConfig().public.auth as Partial<RuntimeAuthConfig>, {
    redirectUserTo: '/',
    redirectGuestTo: '/',
  })
  
  const session = useState<InferSessionFromClient<ClientOptions> | null>('auth:session', () => null)
  const user = useState<InferUserFromClient<ClientOptions> | null>('auth:user', () => null)
  const sessionFetching = import.meta.server ? ref(false) : useState('auth:sessionFetching', () => false)

  const fetchSession = async () => {
    if (sessionFetching.value) {
      return
    }
    
    try {
      sessionFetching.value = true
      const { data } = await client.getSession({
        fetchOptions: {
          headers,
        },
      })
      session.value = data?.session || null
      user.value = data?.user || null
    } catch (err) {
      console.error('Failed to fetch session:', err)
      error.value = err instanceof Error ? err.message : 'Failed to fetch session'
    } finally {
      sessionFetching.value = false
    }
  }

  const handleAuthError = (err: unknown) => {
    console.error('Auth error:', err)
    error.value = err instanceof Error ? err.message : 'Authentication failed'
    throw err
  }

  if (import.meta.client) {
    client.$store.listen('$sessionSignal', async (signal) => {
      if (!signal) return
      await fetchSession()
    })
  }

  return {
    session,
    user,
    loading,
    error,
    loggedIn: computed(() => !!session.value),
    signIn: {
      ...client.signIn,
      email: async (params: { email: string; name: string; password: string }) => {
        try {
          loading.value = true
          error.value = null
          const result = await client.signIn.email(params)
          if (result.error) throw result.error
          return result
        } catch (err) {
          handleAuthError(err)
        } finally {
          loading.value = false
        }
      }
    },
    signUp: {
      ...client.signUp,
      email: async (params: { email: string; name: string; password: string }) => {
        try {
          loading.value = true
          error.value = null
          const result = await client.signUp.email(params)
          if (result.error) throw result.error
          return result
        } catch (err) {
          handleAuthError(err)
        } finally {
          loading.value = false
        }
      }
    },
    async signOut({ redirectTo }: { redirectTo?: RouteLocationRaw } = {}) {
      try {
        loading.value = true
        error.value = null
        const res = await client.signOut()
        session.value = null
        user.value = null
        if (redirectTo) {
          await navigateTo(redirectTo)
        }
        return res
      } catch (err) {
        handleAuthError(err)
      } finally {
        loading.value = false
      }
    },
    options,
    fetchSession,
    client,
  }
}