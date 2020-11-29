import express from 'express'

import { authMiddleware } from '../auth'
import { getAll } from './logs.controller'

const router = express.Router()

router.get('/', authMiddleware.isAuthorized, getAll)

export default router
