import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { ConnectOptions } from 'mongoose'
import { User, usersControllers } from '../../../components/users'
import { testUtils } from '../../../utils'

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

let mongoServer: MongoMemoryServer

const opts: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Users Controllers', () => {
  it('should respond with 404 error since user does not exist', async () => {
    // Arrange
    const mockReq = testUtils.mockUserRequest()
    const mockRes = testUtils.mockResponse()
    const mockNext = testUtils.mockNextFunction()

    // Act
    await usersControllers.getMe(mockReq, mockRes, mockNext)

    // Assert
    expect(mockRes.sendStatus).toHaveBeenCalledWith(404)
  })

  it('should respond with found user data without password value', async () => {
    // Arrange
    const username = 'johndoe'

    await User.create({ username, password: 'secret' })
    const user = await User.findOne({ username })

    const mockReq = testUtils.mockUserRequest(user._id)
    const mockRes = testUtils.mockResponse()
    const mockNext = testUtils.mockNextFunction()

    // Act
    await usersControllers.getMe(mockReq, mockRes, mockNext)

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(200)
    expect(mockRes.json).toHaveBeenCalledWith({ user })

    expect(user).toStrictEqual(
      expect.not.objectContaining({ password: expect.any(String) }),
    )
  })
})
