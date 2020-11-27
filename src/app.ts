import express from 'express'

import { api, database, errorHandler, middlewares, server } from './loaders'
import { logger } from './utils'

export async function init(): Promise<void> {
  try {
    await database.init()

    const app = express()

    middlewares.init(app)
    api.init(app)
    errorHandler.init(app)
    server.init(app)
  } catch (error) {
    logger.error('Unable to initialize app.')
    throw new Error(error)
  }
}
