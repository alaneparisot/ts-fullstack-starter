import * as app from './src/app'

async function init() {
  try {
    await app.init()
  } catch (err) {
    throw new Error(err) // Caught by Winston and process.on|uncaughtException
  }
}

init()
