import express from 'express'

import { authAPI } from '../components/auth'
import { userAPI } from '../components/user'

export function init(app: express.Application) {
  app.use('/api/auth', authAPI)
  app.use('/api/user', userAPI)
}
