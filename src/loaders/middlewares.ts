import compression from 'compression'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

export function init(app: express.Application): void {
  app.use(compression())
  app.use(helmet())
  app.use(cors())
  app.use(express.json())
}
