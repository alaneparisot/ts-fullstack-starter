import { Application } from 'express'
import { authApi } from '../components/auth'
import { logsApi } from '../components/logs'
import { usersApi } from '../components/users'
import config from '../config'

export function init(app: Application) {
  const { rootPath } = config.api

  app.use(`${rootPath}/auth`, authApi.router)
  app.use(`${rootPath}/logs`, logsApi.router)
  app.use(`${rootPath}/users`, usersApi.router)
}
