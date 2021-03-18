import { NextFunction, Response } from 'express'
import { Log } from './Log'
import { IUserRequest } from '../../types'

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
