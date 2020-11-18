import express from 'express'

import { api, database, middlewares, server } from './loaders'

export async function init(): Promise<void> {
  try {
    const app = express()

    await database.init()

    middlewares.init(app)
    api.init(app)
    server.init(app)
  } catch (e) {
    throw new Error('Unable to initialize app.')
  }
}
