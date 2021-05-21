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
  const accessToken: string = req.cookies?.accessToken

  if (!accessToken) return res.sendStatus(403) // Forbidden

  const secret = config.auth.accessTokenSecret

  jwt.verify(accessToken, secret, (err, decoded) => {
    if (err) return res.sendStatus(403) // Forbidden

    req.userId = (<any>decoded).userId

    next()
  })
}
