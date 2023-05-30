import mongoose, { Document, Schema } from 'mongoose'

interface IOrder extends Document {
  customerName: string
  contact: string
  address: string
  orderItems: [
    {
      craftId: string
      quantity: number
    }
  ]
}

const orderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    orderItems: [
      {
        craftId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
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

const OrderModel = mongoose.model<IOrder>('Order', orderSchema)

export default OrderModel
