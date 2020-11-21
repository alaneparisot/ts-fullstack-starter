import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import config from '../../config'
import { IUserRequest } from '../../types'
import { extractToken } from './auth.service'

export function hasCredentials(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, password } = req.body

  if (!username || !password) {
    res.status(400).end()
  } else {
    next()
  }
}

export function isAuthorized(
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
