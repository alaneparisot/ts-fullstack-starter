import express from 'express'
import { csrfToken, login, logout, register } from './auth.controllers'
import { hasCredentials, isAuthorized } from './auth.middlewares'

export const router = express.Router()

router.get('/csrf-token', csrfToken)

router.post('/login', hasCredentials, login)
router.post('/logout', isAuthorized, logout)
router.post('/register', hasCredentials, register)
