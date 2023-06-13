import { IOrder, Order } from '../models/Order'

class OrderRepository {
  public async createOrder(orderData: any): Promise<IOrder> {
    const order = new Order(orderData)
    await order.save()
    return order
  }

  public getOrders(): Promise<IOrder[]> {
    return Order.find()
  }
}

export default OrderRepository
