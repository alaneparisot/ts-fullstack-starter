import { Request } from 'express'
import jwt from 'jsonwebtoken'

import config from '../../config'

export function extractToken(req: Request): string | undefined {
  const authHeader = req.headers['authorization']

  let token

  if (authHeader) {
    token = authHeader.split(' ')[1]
  }

  return token
}

export function generateAccessToken(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = config.auth.accessTokenSecret
    const options = { expiresIn: config.auth.tokenExpireTime }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}
