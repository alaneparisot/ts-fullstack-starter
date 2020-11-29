import { NextFunction, Request, Response } from 'express'

import User from '../users/User'
import { generateAccessToken } from './auth.service'

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username }).select('+password')

    if (!user || !(await user.isPassword(password))) {
      return res.status(401).end()
    }

    const accessToken = await generateAccessToken(user._id)

    res.status(200).json({ accessToken })
  } catch (error) {
    next(error)
  }
}

export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, password } = req.body

    if (await User.findOne({ username })) return res.status(409).end()

    await User.create({ username, password })

    res.status(201).end()
  } catch (error) {
    next(error)
  }
}
