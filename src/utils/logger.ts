import winston from 'winston'
import { MongoDB } from 'winston-mongodb'

import config from '../config'

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
      handleExceptions: true, // Crash the app
    }),
  ],
})

if (config.node.env === 'production') {
  logger.add(
    new MongoDB({
      db: config.database.URI,
      options: {
        useUnifiedTopology: true,
      },
      collection: 'logs',
    }),
  )
}

export default logger
