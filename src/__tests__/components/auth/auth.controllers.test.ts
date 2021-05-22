import { csrfToken } from '../../../components/auth/auth.controllers'
import { testUtils } from '../../../utils'

describe('auth.controllers', () => {
  describe('csrfToken', () => {
    it('should respond with a CSRF token', () => {
      // Arrange
      const token = 'csrf-token'
      const mockReqCsrfToken = jest.fn().mockReturnValue(token)
      const mockReq = testUtils.mockRequest({ csrfToken: mockReqCsrfToken })
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      // Act
      csrfToken(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({ csrfToken: token })
    })
  })
})
