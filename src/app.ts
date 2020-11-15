import express from 'express'

import { middlewares, server } from './loaders'

export function init() {
  const app = express()

  middlewares.init(app)
  server.init(app)
}
