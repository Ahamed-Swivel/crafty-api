import { Document, Schema, model } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
      },
    },
  }
)

export const User = model<IUser>('User', userSchema)
