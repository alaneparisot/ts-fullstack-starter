import { Application, NextFunction, Request, Response } from 'express'

import { logger } from '../utils'

process.on('unhandledRejection', (error: Error) => {
  logger.error(error && error.message, { metadata: 'unhandledRejection' })
  throw error // Caught by Winston and process.on|uncaughtException
})

process.on('uncaughtException', (error: Error) => {
  logger.error(error.message, { metadata: 'uncaughtException' })
})

export function init(app: Application) {
  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    logger.error(error && error.message, { metadata: 'middleware' })
    res.status(500).end()
  })
}
