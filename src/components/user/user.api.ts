import express from 'express'

import { getMe } from './user.controller'
import { authenticate } from '../auth/auth.service'

const router = express.Router()

router.get('/me', authenticate, getMe)

export default router
