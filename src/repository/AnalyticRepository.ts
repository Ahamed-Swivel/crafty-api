import { Order } from '../models/Order'

export interface ITotalQuantity {
  totalQuantity: number
  sumPrice: number
  title: string
  price: number
  imageUrl: string
}

class AnalyticRepository {
  public async getAnalytics(): Promise<ITotalQuantity[]> {
    return this.getTotalOrderItemsQuantity()
  }

  private async getTotalOrderItemsQuantity(): Promise<ITotalQuantity[]> {
    return await Order.aggregate([
      {
        $unwind: '$orderItems',
      },
      {
        $group: {
          _id: '$orderItems.craftId',
          totalQuantity: {
            $sum: '$orderItems.quantity',
          },
          sumPrice: {
            $sum: {
              $multiply: ['$orderItems.quantity', '$orderItems.price'],
            },
          },
          title: {
            $first: '$orderItems.title',
          },
          price: {
            $first: '$orderItems.price',
          },
          imageUrl: {
            $first: '$orderItems.imageUrl',
          },
        },
      },
    ]).exec()
  }
}

export default AnalyticRepository
