export * from './Login'
export * from './authService'

export const ACCESS_TOKEN_COOKIE = 'accessToken'

export interface Credentials {
  username: string
  password: string
}
