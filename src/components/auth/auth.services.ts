import jwt from 'jsonwebtoken'
import config from '../../config'

export function generateAccessToken(userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = { userId }
    const secret = config.auth.accessTokenSecret
    const options = { expiresIn: config.auth.tokenExpireTime }

    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(err)
      if (!token) return reject(new Error('Unable to generate access token.'))
      resolve(token)
    })
  })
}
