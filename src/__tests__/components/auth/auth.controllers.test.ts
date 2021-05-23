import { authControllers, authServices } from '../../../components/auth'
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
      authControllers.csrfToken(mockReq, mockRes, mockNext)

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
      await authControllers.login(mockReq, mockRes, mockNext)

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
      await authControllers.login(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(401)
    })

    it('should set cookie with access token if credentials are correct', async () => {
      // Arrange
      const username = 'johndoe'
      const password = 'secret'
      const token = 'access-token'
      const cookieOptions = {
        maxAge: 60000, // Set in test-utils.ts
        httpOnly: true,
      }

      const user = await User.create({ username, password })

      const mockReqBody = { username, password }
      const mockReq = testUtils.mockRequest({ body: mockReqBody })
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      const spyGenerateAccessToken = jest
        .spyOn(authServices, 'generateAccessToken')
        .mockResolvedValue(token)

      // Act
      await authControllers.login(mockReq, mockRes, mockNext)

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

  describe('logout', () => {
    it('should clear access token cookie', () => {
      // Arrange
      const { mockReq, mockRes, mockNext } = testUtils.mockReqResNext()

      // Act
      authControllers.logout(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.clearCookie).toHaveBeenCalledWith('accessToken')
      expect(mockRes.sendStatus).toHaveBeenCalledWith(200)
    })
  })

  describe('register', () => {
    it('should respond with 409 error status if username already exists', async () => {
      // Arrange
      const username = 'johndoe'
      const password = 'secret'

      await User.create({ username, password })

      const mockReqBody = { username, password }
      const mockReq = testUtils.mockRequest({ body: mockReqBody })
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      // Act
      await authControllers.register(mockReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(409)
    })

    it('should create user in database if user does not already exists', async () => {
      // Arrange
      const username = 'newguy'
      const password = 'secret'

      await User.create({ username: 'oldman', password })

      const mockReqBody = { username, password }
      const mockReq = testUtils.mockRequest({ body: mockReqBody })
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      // Act
      await authControllers.register(mockReq, mockRes, mockNext)

      // Assert
      const user = await User.findOne({ username })

      expect(user.username).toBe(username)
      expect(mockRes.sendStatus).toHaveBeenCalledWith(201)
    })
  })
})
