import express from 'express'
import { csrfToken, login, logout, register } from './auth.controller'
import { hasCredentials, isAuthorized } from './auth.middleware'

export const router = express.Router()

router.get('/csrf-token', csrfToken)

router.post('/login', hasCredentials, login)
router.post('/logout', isAuthorized, logout)
router.post('/register', hasCredentials, register)
