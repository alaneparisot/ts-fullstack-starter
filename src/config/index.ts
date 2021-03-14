import dotenv from 'dotenv'

const { error } = dotenv.config()

if (error) {
  throw new Error('Unable to find .env file.')
}

export default {
  api: {
    rootPath: process.env.API_ROOT_PATH as string,
  },
  auth: {
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET as string,
    saltRounds: parseInt(process.env.AUTH_SALT_ROUNDS as string, 10),
    tokenExpireTime: parseInt(process.env.AUTH_TOKEN_EXPIRE_TIME as string, 10), // Unit == second
  },
  database: {
    URI: process.env.DATABASE_URI as string,
  },
  node: {
    env: process.env.NODE_ENV as string,
  },
  server: {
    port: parseInt(process.env.SERVER_PORT as string, 10),
  },
}
