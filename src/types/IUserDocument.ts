import { Document } from 'mongoose'

export default interface IUserDocument extends Document {
  username: string
  password: string
  isPassword(password: string): Promise<boolean>
}
