import dotenv from 'dotenv'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const { error } = dotenv.config()

if (error) {
  throw new Error('Cannot find .env file.')
}

export default {
  node: {
    env: process.env.NODE_ENV,
  },
  server: {
    port: parseInt(process.env.PORT as string, 10),
  },
}
