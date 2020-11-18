import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import config from '../../config'
import { IUserRequest } from '../../types'

function extractToken(req: Request): string | undefined {
  const authHeader = req.headers['authorization']

  let token

  if (authHeader) {
    token = authHeader.split(' ')[1]
  }

  return token
}

export function authenticate(
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) {
  const token = extractToken(req)

  if (!token) return res.sendStatus(401)

  jwt.verify(token, config.auth.accessTokenSecret, (err, user) => {
    if (err) {
      res.sendStatus(403)
    } else {
      req.user = user
      next()
    }
  })
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
