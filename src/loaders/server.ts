import express from 'express'

import config from '../config'

export function init(app: express.Application) {
  const { port } = config.server

  if (!port) {
    throw new Error('Unable to find server port.')
  }

  app.listen(port, () => {
    console.log(`[server] Running at http://localhost:${port} ⚡️`)
  })
}
