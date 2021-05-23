import { NextFunction, Request, Response } from 'express'
import { COOKIE_OPTIONS } from './auth.constants'
import { generateAccessToken } from './auth.services'
import { User } from '../users'

export function csrfToken(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json({ csrfToken: req.csrfToken() })
  } catch (error) {
    next(error)
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username }).select('+password')

    if (!user || !(await user.isPassword(password))) {
      return res.sendStatus(401)
    }

    const accessToken = await generateAccessToken(user._id)

    res.cookie('accessToken', accessToken, COOKIE_OPTIONS)
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
}

export function logout(_req: Request, res: Response, next: NextFunction) {
  try {
    res.clearCookie('accessToken')
    res.sendStatus(200)
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

    if (await User.findOne({ username })) return res.sendStatus(409)

    await User.create({ username, password })

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
}
