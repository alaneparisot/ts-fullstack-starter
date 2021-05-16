import { NextFunction, Request, Response } from 'express'
import { hasCredentials } from '../../../components/auth/auth.middleware'

describe('Auth Middleware', () => {
  describe('hasCredentials', () => {
    it('should return a 400 status code if username is missing', () => {
      // Arrange
      const mockReq = {
        body: {
          password: '1234567',
        },
      } as Request

      const mockRes = {
        sendStatus: jest.fn(),
      } as unknown as Response

      const mockNext = jest.fn() as NextFunction

      // Act
      hasCredentials(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(400)
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should return a 400 status code if password is missing', () => {
      // Arrange
      const mockReq = {
        body: {
          username: 'johndoe',
        },
      } as Request

      const mockRes = {
        sendStatus: jest.fn(),
      } as unknown as Response

      const mockNext = jest.fn() as NextFunction

      // Act
      hasCredentials(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(400)
      expect(mockNext).not.toHaveBeenCalled()
    })

    it('should call the next function if both credentials are filled', () => {
      // Arrange
      const mockReq = {
        body: {
          username: 'johndoe',
          password: '1234567',
        },
      } as Request

      const mockRes = {
        sendStatus: jest.fn(),
      } as unknown as Response

      const mockNext = jest.fn() as NextFunction

      // Act
      hasCredentials(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).not.toHaveBeenCalledWith(400)
      expect(mockNext).toHaveBeenCalled()
    })
  })
})
