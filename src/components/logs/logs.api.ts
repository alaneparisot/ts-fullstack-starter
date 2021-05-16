import express from 'express'
import { getAll } from './logs.controllers'
import { authMiddlewares } from '../auth'

export const router = express.Router()

router.get('/', authMiddlewares.isAuthorized, getAll)
