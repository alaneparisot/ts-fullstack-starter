import jwt from 'jsonwebtoken'

import config from '../../config'

export function generateAccessToken(userId: string): Promise<string | Error> {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = config.auth.accessTokenSecret
    const options = { expiresIn: config.auth.tokenExpireTime }

    jwt.sign(payload, secret, options, (error, token) => {
      if (error) return reject(error)

      resolve(token)
    })
  })
}
