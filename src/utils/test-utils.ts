import { NextFunction, Request, Response } from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { IUserRequest } from '../types'

let MongoMemoryServer: any

// Jest Setup

if (process.env.NODE_ENV === 'test') {
  /**
   * Purpose: to avoid error "Cannot find module 'mongodb-memory-server'"
   * without having to install mongodb-memory-server in production.
   */
  MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer

  process.env.AUTH_ACCESS_TOKEN_SECRET = 'secret'
  process.env.AUTH_TOKEN_EXPIRE_TIME = '60'
}

// Database

export function mockDatabase() {
  let mongoServer = new MongoMemoryServer()

  const connect = async () => {
    const mongoUri = await mongoServer.getUri()

    const opts: ConnectOptions = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    await mongoose.connect(mongoUri, opts, (err) => {
      if (err) console.error(err)
    })
  }

  const clear = async () => {
    const collections = mongoose.connection.collections

    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
    }
  }

  const close = async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoose.disconnect()
    await mongoServer.stop()
  }

  return { connect, clear, close }
}

// Middlewares

export function mockReqResNext() {
  return {
    mockReq: mockRequest(),
    mockRes: mockResponse(),
    mockNext: mockNextFunction(),
  }
}

export function mockRequest(params?: object): Request {
  return { ...params } as Request
}

export function mockUserRequest(
  userId?: string,
  cookies?: object,
): IUserRequest {
  return {
    userId: userId ?? '60a56c5483c82d0cf0f7cc75',
    cookies,
  } as IUserRequest
}

export function mockResponse(): Response {
  const res: any = {}

  res.clearCookie = jest.fn()
  res.cookie = jest.fn()
  res.json = jest.fn()
  res.sendStatus = jest.fn()
  res.status = jest.fn().mockReturnValue(res)

  return res
}

export function mockNextFunction(): NextFunction {
  return jest.fn().mockImplementation((...args: any) => {
    if (args[0] instanceof Error) console.error(args[0])
  })
}
