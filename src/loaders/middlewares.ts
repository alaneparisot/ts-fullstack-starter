import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import csrf from 'csurf'
import express, { Application } from 'express'
import helmet from 'helmet'

export function init(app: Application) {
  app.use(cookieParser())
  app.use(csrf({ cookie: true }))
  app.use(compression())
  app.use(helmet())
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}
