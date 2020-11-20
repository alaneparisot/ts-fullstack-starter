import { Request } from 'express'

export default interface IUserRequest extends Request {
  userId?: string
}
