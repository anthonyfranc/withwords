import { serverSupabaseUser, serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const user = await serverSupabaseUser(event)
  if (!user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const client = await serverSupabaseClient(event)
  const { data: subscription, error } = await client
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (error) {
    throw createError({
      statusCode: 500,
      message: error.message
    })
  }

  return subscription
})