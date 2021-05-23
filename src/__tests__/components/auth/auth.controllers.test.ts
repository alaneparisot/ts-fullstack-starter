import { csrfToken, login } from '../../../components/auth/auth.controllers'
import * as authServices from '../../../components/auth/auth.services'
import { User } from '../../../components/users'
import { testUtils } from '../../../utils'

const mockDB = testUtils.mockDatabase()

beforeAll(async () => await mockDB.connect())
afterEach(async () => await mockDB.clear())
afterAll(async () => await mockDB.close())

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

  describe('login', () => {
    it('should respond with 401 error status if user does not exist', async () => {
      // Arrange
      const mockReqBody = { username: 'unknown', password: 'secret' }
      const mockReq = testUtils.mockRequest({ body: mockReqBody })
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      // Act
      await login(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(401)
    })

    it('should respond with 401 error status if password is incorrect', async () => {
      // Arrange
      const username = 'johndoe'

      await User.create({ username, password: 'secret' })

      const mockReqBody = { username, password: 'incorrect' }
      const mockReq = testUtils.mockRequest({ body: mockReqBody })
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      // Act
      await login(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(401)
    })

    it('should set cookie with access token if credentials are correct', async () => {
      // Arrange
      const username = 'johndoe'
      const password = 'secret'
      const token = 'access-token'
      const cookieOptions = { maxAge: 60000, httpOnly: true }

      const user = await User.create({ username, password })

      const mockReqBody = { username, password }
      const mockReq = testUtils.mockRequest({ body: mockReqBody })
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      const spyGenerateAccessToken = jest
        .spyOn(authServices, 'generateAccessToken')
        .mockResolvedValue(token)

      // Act
      await login(mockReq, mockRes, mockNext)

      // Assert
      expect(spyGenerateAccessToken).toHaveBeenCalledWith(user._id)

      expect(mockRes.cookie).toHaveBeenCalledWith(
        'accessToken',
        token,
        cookieOptions,
      )

      expect(mockRes.sendStatus).toHaveBeenCalledWith(200)
    })
  })
})
