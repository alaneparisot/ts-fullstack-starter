import express from 'express'

import { checkUsernameAndPassword, login, register } from './auth.controller'

const router = express.Router()

router.post('/login', checkUsernameAndPassword, login)
router.post('/register', checkUsernameAndPassword, register)

export default router
