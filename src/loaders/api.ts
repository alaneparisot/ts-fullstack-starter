import { Application } from 'express'
import { authApi } from '../components/auth'
import { logApi } from '../components/logs'
import { userApi } from '../components/users'
import config from '../config'

export function init(app: Application) {
  const { rootPath } = config.api

  app.use(`${rootPath}/auth`, authApi.router)
  app.use(`${rootPath}/logs`, logApi)
  app.use(`${rootPath}/users`, userApi)
}
