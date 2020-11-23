import { Application } from 'express'

import config from '../config'
import { authAPI } from '../components/auth'
import { userAPI } from '../components/user'

export function init(app: Application) {
  const { rootPath } = config.api

  app.use(rootPath + '/auth', authAPI)
  app.use(rootPath + '/user', userAPI)
}
