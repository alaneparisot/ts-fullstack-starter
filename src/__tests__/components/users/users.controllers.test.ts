import { User } from '../../../components/users'
import { getMe } from '../../../components/users/users.controllers'
import { testUtils } from '../../../utils'

const mockDB = testUtils.mockDatabase()

beforeAll(async () => await mockDB.connect())
afterEach(async () => await mockDB.clear())
afterAll(async () => await mockDB.close())

describe('users.controllers', () => {
  describe('getMe', () => {
    it('should respond with 404 error status if user does not exist', async () => {
      // Arrange
      const mockUserReq = testUtils.mockUserRequest()
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      // Act
      await getMe(mockUserReq, mockRes, mockNext)

      // Assert
      expect(mockRes.sendStatus).toHaveBeenCalledWith(404)
    })

    it('should respond with found user data without password value', async () => {
      // Arrange
      const username = 'johndoe'

      await User.create({ username, password: 'secret' })
      const user = await User.findOne({ username }) // Returns user w/o password

      const mockUserReq = testUtils.mockUserRequest(user._id)
      const { mockRes, mockNext } = testUtils.mockReqResNext()

      // Act
      await getMe(mockUserReq, mockRes, mockNext)

      // Assert
      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith({ user })

      expect(user).toStrictEqual(
        expect.not.objectContaining({ password: expect.any(String) }),
      )
    })
  })
})
