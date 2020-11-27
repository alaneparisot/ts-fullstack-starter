import { Application } from 'express'

import config from '../config'
import { logger } from '../utils'

export function init(app: Application) {
  const { port } = config.server

  if (!port) {
    throw new Error('Unable to find server port.')
  }

  app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`)
  })
}
