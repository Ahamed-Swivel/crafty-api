import { Craft, ICraft } from '../models/Craft';
import { IOrder, Order } from '../models/Order'

interface IOrderItem {
  craftId: string
  quantity: number
  title: string
  price: number
  imageUrl: string
}

class OrderRepository {
  public async createOrder(orderData: any): Promise<IOrder> {
    const order = new Order(orderData)

    // Check order items are available to place order
    await this.checkItemQuantities(orderData.orderItems)
      .then(async (insufficientItems) => {
        if (insufficientItems.length > 0) {
          throw new Error("Insufficient quantities for item/s")
        } else {

          // Update the available quantity according to order
          await this.updateCraftQuantity(orderData.orderItems)
          await order.save()
        }
      })
      .catch(error => {
        throw new Error(error)
      });

      return order
  }

  public getOrders(): Promise<IOrder[]> {
    return Order.find()
  }

  async checkItemQuantities(itemOrders: IOrderItem[]): Promise<IOrderItem[]> {
    try {
      const insufficientItems: IOrderItem[] = [];

      for (const itemOrder of itemOrders) {
        const { craftId, quantity } = itemOrder;
        const item: ICraft | null = await Craft.findById(craftId);

        if (item && item.availableQuantity < quantity) {
          insufficientItems.push(itemOrder);
        }
      }

      return insufficientItems;
    } catch (error) {
      throw new Error('Failed to check item quantities.');
    }
  }

  async updateCraftQuantity(itemOrders: IOrderItem[]): Promise<void> {
    try {
      for (const itemOrder of itemOrders) {
        const { craftId } = itemOrder;
        const item = await Craft.findById(craftId);

        if (item) {
          item.availableQuantity = item.availableQuantity - itemOrder.quantity
          await item.save()
        }
      }
    } catch (error) {
      throw new Error('Failed to update item quantities.');
    }
  }
}


export default OrderRepository
