import { NextFunction, Response } from 'express'

import User from './User'
import { IUserRequest } from '../../types'

export async function getMe(
  req: IUserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    res.status(200).json({ user: await User.findById(req.userId) })
  } catch (error) {
    next(error)
  }
}
