import jwt from 'jsonwebtoken'
import { generateAccessToken } from '../../../components/auth/auth.services'

describe('auth.services', () => {
  describe('generateAccessToken', () => {
    it('should return a valid access token', async () => {
      // Arrange
      const username = 'johndoe'
      const secret = 'secret' // Set in test-utils.ts

      const spySign = jest.spyOn(jwt, 'sign')

      // Act
      const token = await generateAccessToken(username)
      const { userId }: any = jwt.verify(token, secret)

      // Assert
      const payload = { userId: username }
      const options = { expiresIn: 60 } // Set in test-utils.ts
      const callback = expect.any(Function)

      expect(spySign).toHaveBeenCalledWith(payload, secret, options, callback)
      expect(userId).toBe(username)
    })
  })
})
