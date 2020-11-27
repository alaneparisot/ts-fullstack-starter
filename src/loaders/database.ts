import mongoose from 'mongoose'

import config from '../config'
import { logger } from '../utils'

export async function init(): Promise<void> {
  const { URI } = config.database

  if (!URI) {
    throw new Error('Unable to find database URI.')
  }

  const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    await mongoose.connect(URI, options)
  } catch (error) {
    logger.error('Unable to connect to database.')
    throw new Error(error)
  }
}
