import compression from 'compression'
import cors from 'cors'
import express, { Application } from 'express'
import helmet from 'helmet'

export function init(app: Application) {
  app.use(compression())
  app.use(helmet())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}
