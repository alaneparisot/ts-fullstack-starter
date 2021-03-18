import mongoose, { Document, Schema } from 'mongoose'

interface ILogDocument extends Document {
  timestamp: Date
  level: string
  message: string
  meta: object | null
}

const logSchema = new Schema({
  timestamp: { type: Date, required: true },
  level: { type: String, required: true },
  message: { type: String },
  meta: { type: Object },
})

export const Log = mongoose.model<ILogDocument>('Log', logSchema)
