import express from 'express'

import { authMiddleware } from '../auth'
import { getMe } from './user.controller'

const router = express.Router()

router.get('/me', authMiddleware.isAuthorized, getMe)

export default router
