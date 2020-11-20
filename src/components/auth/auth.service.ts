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

  if (!token) return res.status(403).end()

  const secret = config.auth.accessTokenSecret

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      res.status(403).end()
    } else {
      req.userId = (<any>decoded).userId
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
