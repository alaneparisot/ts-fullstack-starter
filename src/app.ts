import express from 'express'

import { api, database, middlewares, server } from './loaders'

export async function init(): Promise<void> {
  try {
    await database.init()

    const app = express()

    middlewares.init(app)
    api.init(app)
    server.init(app)
  } catch (e) {
    throw new Error('Unable to initialize app.')
  }
}
