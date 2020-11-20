import { Response } from 'express'

import User from '../../models/User'
import { IUserRequest } from '../../types'

export async function getMe(req: IUserRequest, res: Response) {
  try {
    const user = await User.findById(req.userId)
    res.status(200).json({ user })
  } catch (e) {
    res.status(500).end()
  }
}
