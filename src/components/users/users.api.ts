import express from 'express'
import { getMe } from './users.controllers'
import { isAuthorized } from '../auth/auth.middlewares'

export const router = express.Router()

router.get('/me', isAuthorized, getMe)
