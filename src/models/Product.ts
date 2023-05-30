import { Schema, model, Document } from 'mongoose'

export interface ICraft extends Document {
  title: string
  description: string
  category: string
  price: number
  imageUrl: string
  availableQuantity: number
}

const ProductSchema = new Schema<ICraft>(
  {
    title: { type: String, required: true },
    description: { type: String },
    category: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    availableQuantity: { type: Number, required: true },
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

export const Craft = model<ICraft>('Craft', ProductSchema)
