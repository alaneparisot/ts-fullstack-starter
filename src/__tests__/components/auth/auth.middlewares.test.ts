import { NextFunction, Response } from 'express'
import {
  hasCredentials,
  isAuthorized,
} from '../../../components/auth/auth.middlewares'
import { generateAccessToken } from '../../../components/auth/auth.services'
import { testUtils } from '../../../utils'

describe('auth.middlewares', () => {
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
      const mockReq = testUtils.mockRequest({ body: reqBody })
      const { mockRes, mockNext } = testUtils.mockReqResNext()

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

    it('should respond with 400 error status if all credentials are missing', () => {
      testHasCredentials({
        reqBody: {},
        shouldSend400: true,
        shouldCallNext: false,
      })
    })

    it('should respond with 400 error status if username is missing', () => {
      testHasCredentials({
        reqBody: { password: 'secret' },
        shouldSend400: true,
        shouldCallNext: false,
      })
    })

    it('should respond with 400 error status if password is missing', () => {
      testHasCredentials({
        reqBody: { username: 'johndoe' },
        shouldSend400: true,
        shouldCallNext: false,
      })
    })

    it('should call the next function if all credentials are filled', () => {
      testHasCredentials({
        reqBody: { username: 'johndoe', password: 'secret' },
        shouldSend400: false,
        shouldCallNext: true,
      })
    })
  })

  describe('isAuthorized', () => {
    let mockRes: Response
    let mockNext: NextFunction

    beforeEach(() => {
      process.env.AUTH_ACCESS_TOKEN_SECRET = 'secret'
      mockRes = testUtils.mockResponse()
      mockNext = testUtils.mockNextFunction()
    })

    it('should respond with 403 error status if access token is missing', () => {
      // Arrange
      const mockUserReq = testUtils.mockUserRequest()

      // Act
      isAuthorized(mockUserReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(403)
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should respond with 403 error status if access token is invalid', () => {
      // Arrange
      const accessToken = 'invalid-token'
      const cookies = { accessToken }

      const mockUserReq = testUtils.mockUserRequest('', cookies)

      // Act
      isAuthorized(mockUserReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(403)
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should call the next function if access token is valid', async () => {
      // Arrange
      const accessToken = await generateAccessToken('johndoe')
      const cookies = { accessToken }

      const mockUserReq = testUtils.mockUserRequest('', cookies)

      // Act
      isAuthorized(mockUserReq, mockRes, mockNext)

      // Assert
      expect(mockNext).toHaveBeenCalled()
      expect(mockRes.sendStatus).not.toHaveBeenCalled()
    })
  })
})
