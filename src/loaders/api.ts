import { Application } from 'express'

import config from '../config'
import { authAPI } from '../components/auth'
import { logsAPI } from '../components/logs'
import { usersAPI } from '../components/users'

export function init(app: Application) {
  const { rootPath } = config.api

  app.use(`${rootPath}/auth`, authAPI)
  app.use(`${rootPath}/logs`, logsAPI)
  app.use(`${rootPath}/users`, usersAPI)
}
