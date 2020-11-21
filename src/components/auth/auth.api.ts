import express from 'express'

import { login, register } from './auth.controller'
import { hasCredentials } from './auth.middleware'

const router = express.Router()

router.post('/login', hasCredentials, login)
router.post('/register', hasCredentials, register)

export default router
