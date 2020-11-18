import express from 'express'

import { authAPI } from '../components/auth'

export function init(app: express.Application) {
  app.use('/api/auth', authAPI)
}
