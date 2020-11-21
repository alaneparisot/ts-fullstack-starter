import express from 'express'

import config from '../config'
import { authAPI } from '../components/auth'
import { userAPI } from '../components/user'

export function init(app: express.Application) {
  const { rootPath } = config.api

  app.use(rootPath + '/auth', authAPI)
  app.use(rootPath + '/user', userAPI)
}
