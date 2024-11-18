import { consola } from 'consola'
import { getMigrations } from 'better-auth/db'

export default defineNitroPlugin(() => {
  if (!import.meta.dev) {
    return
  }
  onHubReady(async () => {
    const auth = serverAuth()
    const { toBeCreated, toBeAdded, runMigrations } = await getMigrations(auth.options)
    if (!toBeCreated.length && !toBeAdded.length) {
      consola.info('[better-auth] No pending migrations')
      return
    }
    consola.info(`[better-auth] Database migrations will affect the following tables:`)

    for (const table of [...toBeCreated, ...toBeAdded]) {
      consola.log(`\`${table.table}\` table with ${Object.keys(table.fields).map(f => `\`${f}\``).join(', ')} fields.`)
    }
    await runMigrations()
    consola.success('[better-auth] Database migrations ran successfully')

    // Verify tables exist
    const db = hubDatabase()
    const tables = await db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name IN ('users', 'sessions', 'auth_keys', 'verification_tokens')
    `).all()
    
    consola.info('[better-auth] Existing tables:', tables.results?.map(t => t.name).join(', '))
  })
})