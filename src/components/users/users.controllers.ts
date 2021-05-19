import { NextFunction, Response } from 'express'
import { User } from './User'
import { IUserRequest } from '../../types'

export async function getMe(
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const user = await User.findById(req.userId)

    if (user) {
      res.status(200).json({ user })
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
}
