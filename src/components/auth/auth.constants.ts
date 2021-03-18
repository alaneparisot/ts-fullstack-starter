import { CookieOptions } from 'express'
import config from '../../config'

export const COOKIE_OPTIONS: CookieOptions = Object.freeze({
  maxAge: config.auth.tokenExpireTime * 1000,
  httpOnly: true,
})
