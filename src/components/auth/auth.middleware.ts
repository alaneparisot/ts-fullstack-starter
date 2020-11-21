import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import config from '../../config'
import { IUserRequest } from '../../types'

export function hasCredentials(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password } = req.body

  if (!username || !password) return res.status(400).end()

  next()
}

export function isAuthorized(
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers && req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(403).end()

  const secret = config.auth.accessTokenSecret

  jwt.verify(token, secret, (error, decoded) => {
    if (error) return res.status(403).end()

    req.userId = (<any>decoded).userId

    next()
  })
}
