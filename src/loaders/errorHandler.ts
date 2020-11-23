import { Application, NextFunction, Request, Response } from 'express'

export function init(app: Application) {
  app.use(
    (_error: Error, _req: Request, res: Response, _next: NextFunction) => {
      res.status(500).end()
    },
  )

  process.on('unhandledRejection', (error: Error) => {
    throw error // Will be caught below.
  })

  process.on('uncaughtException', (_error: Error) => {
    process.exit(1)
  })
}
