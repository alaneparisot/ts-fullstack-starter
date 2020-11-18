import * as app from './src/app'

async function init() {
  try {
    await app.init()
  } catch (error) {
    const textColor = '\x1b[31m' // Red.
    console.log(textColor + '[UNCAUGHT ERROR]', error)
  }
}

init()
