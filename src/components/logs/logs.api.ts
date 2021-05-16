import express from 'express'
import { getAll } from './logs.controller'
import { authMiddleware } from '../auth'

export const router = express.Router()

router.get('/', authMiddleware.isAuthorized, getAll)
