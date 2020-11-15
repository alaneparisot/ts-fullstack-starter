import express from 'express'

import config from '../config'

export function init(app: express.Application) {
  const port = config.server.port

  if (!port) {
    throw new Error('Cannot find server port.')
  }

  app.get('/', (_req, res) => res.send('Welcome!'))

  app.listen(port, () => {
    console.log(`[server] Running at https://localhost:${port} ⚡️`)
  })
}
