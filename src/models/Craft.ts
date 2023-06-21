import { Schema, model, Document } from 'mongoose'

export interface ICraft {
  id?: string
  title: string
  description: string
  category: string
  price: number
  imageUrl: string
  availableQuantity: number
  status: boolean
}
export interface ICraftDoc extends Document {
  title: string
  description: string
  category: string
  price: number
  imageUrl: string
  availableQuantity: number
  status: boolean
}

/**
 * @openapi
 * components:
 *  schemas:
 *    Craft:
 *      required:
 *      - email
 *      - title
 *      - description
 *      - category
 *      - price
 *      - imageUrl
 *      - availableQuantity
 *      - status
 *      type: object
 *      properties:
 *        title:
 *           type: string
 *        description:
 *           type: string
 *        category:
 *           type: string
 *        price:
 *           type: number
 *        imageUrl:
 *           type: string
 *        availableQuantity:
 *           type: number
 *        status:
 *           type: boolean
 *    CreateCraftResponse:
 *      type: object
 *      properties:
 *        title:
 *           type: string
 *        description:
 *           type: string
 *        category:
 *           type: string
 *        price:
 *           type: number
 *        imageUrl:
 *           type: string
 *        availableQuantity:
 *           type: number
 *        status:
 *           type: boolean
 *    AddNewCraftBody:
 *      type: object
 *      properties:
 *        title:
 *           type: string
 *        description:
 *           type: string
 *        category:
 *           type: string
 *        price:
 *           type: number
 *        imageUrl:
 *           type: string
 *        availableQuantity:
 *           type: number
 *    UpdateCraftBody:
 *      type: object
 *      properties:
 *        title:
 *           type: string
 *        description:
 *           type: string
 *        category:
 *           type: string
 *        price:
 *           type: number
 *        imageUrl:
 *           type: string
 *        availableQuantity:
 *           type: number
 */

const ProductSchema = new Schema<ICraftDoc>(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    availableQuantity: { type: Number, required: true },
    status: { type: Boolean, default: true },
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

export const Craft = model<ICraftDoc>('Craft', ProductSchema)
