export * from './Login'
export * from './authSlice'

export const ACCESS_TOKEN_COOKIE = 'accessToken'

export interface Credentials {
  username: string
  password: string
}
