import mongoose from 'mongoose'

import config from '../config'

export async function init(): Promise<void> {
  const { URI } = config.database

  if (!URI) {
    throw new Error('Unable to find database URI.')
  }

  const params = '?retryWrites=false'

  const options = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    await mongoose.connect(URI + params, options)
  } catch (e) {
    throw new Error('Unable to connect to database.')
  }
}
