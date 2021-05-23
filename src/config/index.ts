import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'

if (process.env.NODE_ENV !== 'test') {
  const { error } = dotenv.config()

  if (error && process.env.NODE_ENV !== 'production') {
    throw new Error('Unable to find .env file.')
  }
}

export default {
  api: {
    rootPath: process.env.API_ROOT_PATH,
  },
  auth: {
    accessTokenSecret: process.env.AUTH_ACCESS_TOKEN_SECRET as Secret,
    saltRounds: parseInt(process.env.AUTH_SALT_ROUNDS as string, 10),
    tokenExpireTime: parseInt(process.env.AUTH_TOKEN_EXPIRE_TIME as string, 10), // Unit == second
  },
  database: {
    URI: process.env.DATABASE_URI as string,
  },
  node: {
    env: process.env.NODE_ENV ?? 'development',
  },
  server: {
    /**
     * @summary Use process.env.PORT to avoid Heroku's boot timeout error
     * @see https://stackoverflow.com/a/15693371 "Heroku dynamically assigns
     * your app a port, so you can't set the port to a fixed number."
     */
    port: process.env.PORT ?? 5000, // Default value should match value in client > package.json > proxy
  },
}
