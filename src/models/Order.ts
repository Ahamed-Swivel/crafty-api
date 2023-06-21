import mongoose, { Document, Schema, model } from 'mongoose'

export interface IOrder extends Document {
  customerName: string
  contact: string
  address: string
  orderItems: [
    {
      craftId: string
      quantity: number
      title: string
      price: number
      imageUrl: string
    }
  ]
}

/**
 * @openapi
 * components:
 *  schemas:
 *    OrderItem:
 *      required:
 *      - craftId
 *      - quantity
 *      - title
 *      - price
 *      - imageUrl
 *      type: object
 *      properties:
 *        craftId:
 *          type: string
 *        quantity:
 *          type: integer
 *        title:
 *          type: string
 *        price:
 *          type: integer
 *        imageUrl:
 *          type: string
 *    Order:
 *      required:
 *      - customerName
 *      - contact
 *      - address
 *      - orderItems
 *      type: object
 *      properties:
 *        customerName:
 *          type: string
 *        contact:
 *          type: string
 *        address:
 *          type: string
 *        orderItems:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/OrderItem'
 *    CreateOrderResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *        customerName:
 *          type: string
 *        contact:
 *          type: string
 *        address:
 *          type: string
 *        orderItems:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/OrderItem'
 */
const orderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    orderItems: [
      {
        craftId: { type: mongoose.Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        imageUrl: { type: String },
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

export const Order = model<IOrder>('Order', orderSchema)
