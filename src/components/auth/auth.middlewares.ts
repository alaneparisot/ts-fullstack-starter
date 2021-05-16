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

  if (!username || !password) return res.sendStatus(400) // Bad Request

  next()
}

export function isAuthorized(
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) {
  const accessToken: string = req.cookies && req.cookies.accessToken

  if (!accessToken) return res.status(403).end() // Forbidden

  const secret = config.auth.accessTokenSecret

  jwt.verify(accessToken, secret, (err, decoded) => {
    if (err) return res.status(403).end() // Forbidden

    req.userId = (<any>decoded).userId

    next()
  })
}