import * as app from './src/app'

async function init() {
  try {
    await app.init()
  } catch (error) {
    throw new Error(error) // Caught by Winston and process.on|uncaughtException
  }
}

init()
