import { Application, NextFunction, Request, Response } from 'express'

import { logger } from '../utils'

process.on('unhandledRejection', (error: Error) => {
  const metadata = { unhandledRejection: true }
  logger.error(error && error.message, { metadata })
  throw error // Caught by Winston and process.on|uncaughtException
})

process.on('uncaughtException', (error: Error) => {
  const metadata = { uncaughtException: true }
  logger.error(error.message, { metadata })
})

export function init(app: Application) {
  app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
    const metadata = { middleware: true }
    logger.error(error && error.message, { metadata })
    res.status(500).end()
  })
}
