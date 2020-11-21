import { Request, Response } from 'express'

import User from '../../models/User'
import { generateAccessToken } from './auth.service'

export async function login(req: Request, res: Response) {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username }).select('+password')

    if (user) {
      if (await user.isPassword(password)) {
        const accessToken = await generateAccessToken(user._id)
        res.status(200).json({ accessToken })
      } else {
        res.status(401).end()
      }
    } else {
      res.status(401).end()
    }
  } catch (e) {
    res.status(500).end()
  }
}

export async function register(req: Request, res: Response) {
  const { username, password } = req.body

  try {
    if (await User.findOne({ username })) {
      res.status(401).end()
    } else {
      const user = new User({ username, password })

      await user.save()
      res.status(201).end()
    }
  } catch (e) {
    res.status(500).end()
  }
}
