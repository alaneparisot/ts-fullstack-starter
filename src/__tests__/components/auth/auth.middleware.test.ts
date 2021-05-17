import { NextFunction, Request, Response } from 'express'
import { hasCredentials } from '../../../components/auth/auth.middlewares'

describe('Auth Middlewares', () => {
  describe('hasCredentials', () => {
    type TestHasCredentialsParams = {
      reqBody: {
        username?: string
        password?: string
      }
      shouldCallNext: boolean
      shouldSend400: boolean
    }

    const testHasCredentials = ({
      reqBody,
      shouldCallNext,
      shouldSend400,
    }: TestHasCredentialsParams) => {
      // Arrange
      const mockReq = {
        body: reqBody,
      } as Request

      const mockRes = {
        sendStatus: jest.fn(),
      } as unknown as Response

      const mockNext = jest.fn() as NextFunction

      // Act
      hasCredentials(mockReq, mockRes, mockNext)

      // Assert
      shouldSend400
        ? expect(mockRes.sendStatus).toHaveBeenCalledWith(400)
        : expect(mockRes.sendStatus).not.toHaveBeenCalledWith(400)

      shouldCallNext
        ? expect(mockNext).toHaveBeenCalled()
        : expect(mockNext).not.toHaveBeenCalled()
    }

    it('should send a 400 status code if all credentials are missing', () => {
      testHasCredentials({
        reqBody: {},
        shouldSend400: true,
        shouldCallNext: false,
      })
    })

    it('should send a 400 status code if username is missing', () => {
      testHasCredentials({
        reqBody: { password: '1234567' },
        shouldSend400: true,
        shouldCallNext: false,
      })
    })

    it('should send a 400 status code if password is missing', () => {
      testHasCredentials({
        reqBody: { username: 'johndoe' },
        shouldSend400: true,
        shouldCallNext: false,
      })
    })

    it('should call the next function if all credentials are filled', () => {
      testHasCredentials({
        reqBody: { username: 'johndoe', password: '1234567' },
        shouldSend400: false,
        shouldCallNext: true,
      })
    })
  })
})
