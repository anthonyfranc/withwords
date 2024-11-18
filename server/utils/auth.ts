import { betterAuth } from 'better-auth'
import { D1Dialect } from '@atinux/kysely-d1'
import { anonymous, admin } from 'better-auth/plugins'
import { consola } from 'consola'

let _auth: ReturnType<typeof betterAuth>
export function serverAuth() {
  if (!_auth) {
    _auth = betterAuth({
      database: {
        dialect: new D1Dialect({
          database: hubDatabase() as any,
        }),
        type: 'sqlite',
      },
      secondaryStorage: {
        get: key => hubKV().getItemRaw(`_auth:${key}`),
        set: (key, value, ttl) => {
          return hubKV().set(`_auth:${key}`, value, { ttl })
        },
        delete: key => hubKV().del(`_auth:${key}`),
      },
      baseURL: getBaseURL(),
      basePath: '/api/auth',
      emailAndPassword: {
        enabled: true,
        onBeforeCreateUser: async (user, ctx) => {
          consola.info('[better-auth] Creating user:', user)
          return user
        },
        onAfterCreateUser: async (user, ctx) => {
          consola.success('[better-auth] User created:', user)
          return user
        },
      },
      socialProviders: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID!,
          clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        },
      },
      account: {
        accountLinking: {
          enabled: true,
        },
      },
      plugins: [anonymous(), admin()],
    })
  }
  return _auth
}

function getBaseURL() {
  let baseURL = process.env.BETTER_AUTH_URL
  if (!baseURL) {
    try {
      baseURL = getRequestURL(useEvent()).origin
    }
    catch (e) {}
  }
  return baseURL
}