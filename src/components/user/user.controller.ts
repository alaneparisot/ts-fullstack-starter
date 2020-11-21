import { Response } from 'express'

import User from '../../models/User'
import { IUserRequest } from '../../types'

export async function getMe(req: IUserRequest, res: Response) {
  try {
    res.status(200).json({ user: await User.findById(req.userId) })
  } catch (e) {
    res.status(500).end()
  }
}
