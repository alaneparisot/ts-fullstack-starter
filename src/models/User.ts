import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'

import config from '../config'
import { IUserDocument } from '../types'

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
})

userSchema.methods.isPassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const document = this as IUserDocument

    try {
      const hash = await bcrypt.hash(document.password, config.auth.saltRounds)
      document.password = hash
      next()
    } catch (error) {
      next(error)
    }
  } else {
    next()
  }
})

export default mongoose.model<IUserDocument>('User', userSchema)
