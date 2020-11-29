import { NextFunction, Response } from 'express'

import { IUserRequest } from '../../types'
import Log from './Log'

export async function getAll(
  _req: IUserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const logs = await Log.find({})
    res.status(200).json({ logs })
  } catch (error) {
    next(error)
  }
}
