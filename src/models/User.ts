import { Document, Schema, model } from 'mongoose'


export interface IUser {
  name: string
  email: string
  password: string
}
export interface IUserDoc extends Document {
  name: string
  email: string
  password: string
}

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      required:
 *      - email
 *      - password
 *      type: object
 *      properties:
 *        email:
 *           type: string
 *        password:
 *           type: string
 *    LoginSuccessResponse:
 *      type: object
 *      properties:
 *        token:
 *           type: string
 *        name:
 *           type: string
 *        email:
 *           type: string
 */
const userSchema = new Schema<IUserDoc>(
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

export const User = model<IUserDoc>('User', userSchema)
