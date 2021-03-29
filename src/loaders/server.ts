import express, { Application } from 'express'
import path from 'path'

import config from '../config'
import { logger } from '../utils'

export function init(app: Application) {
  const { port } = config.server

  if (!port) {
    throw new Error('Unable to find server port.')
  }

  if (config.node.env === 'production') {
    app.use(
      express.static(
        path.resolve(__dirname, '..', '..', '..', 'client', 'build'),
      ),
    )

    app.get('*', (_req, res) => {
      res.sendFile(
        path.resolve(
          __dirname,
          '..',
          '..',
          '..',
          'client',
          'build',
          'index.html',
        ),
      )
    })
  }

  app.listen(port, () => {
    logger.info(`Server is running at http://localhost:${port}`)
  })
}
