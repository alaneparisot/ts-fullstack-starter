import { NextFunction, Request, Response } from 'express'
import { IUserRequest } from '../types'

export function mockNextFunction(): NextFunction {
  return jest.fn()
}

export function mockResponse(): Response {
  const res: any = {}

  res.json = jest.fn()
  res.sendStatus = jest.fn()
  res.status = jest.fn().mockReturnValue(res)

  return res
}

export function mockUserRequest(userId?: string): IUserRequest {
  return { userId: userId ?? '60a56c5483c82d0cf0f7cc75' } as IUserRequest
}
