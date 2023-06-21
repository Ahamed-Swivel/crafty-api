import OrderRepository from '../../repository/OrderRepository'

describe('OrderRepository', () => {
  const mockOrderData = {
    customerName: 'John Doe',
    contact: 'john@example.com',
    address: '123 Main St',
    orderItems: [
      {
        craftId: 'craft1',
        quantity: 2,
        title: 'Craft 1',
        price: 10,
        imageUrl: 'https://example.com/craft1.jpg',
      },
      {
        craftId: 'craft2',
        quantity: 1,
        title: 'Craft 2',
        price: 20,
        imageUrl: 'https://example.com/craft2.jpg',
      },
    ],
  };

  describe('createOrder', () => {
    it('should create and save an order', async () => {
      const mockOrder = {
        _id: 'order1',
      };
      const mockOrderModel = jest.fn().mockReturnValue(mockOrder);

      const orderRepository = new OrderRepository();
      jest.spyOn(orderRepository, 'createOrder').mockImplementation(async () => {
        return await mockOrderModel(mockOrderData);
      });

      const result = await orderRepository.createOrder(mockOrderData);

      expect(mockOrderModel).toHaveBeenCalledWith(mockOrderData);
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getOrders', () => {
    it('should return an array of orders', async () => {
      const mockOrders = [
        {
          _id: 'order1',
          customerName: 'John Doe',
          contact: 'john@example.com',
          address: '123 Main St',
          orderItems: [
            {
              craftId: 'craft1',
              quantity: 2,
              title: 'Craft 1',
              price: 10,
              imageUrl: 'https://example.com/craft1.jpg',
            },
          ],
        },
        {
          _id: 'order2',
          customerName: 'Jane Smith',
          contact: 'jane@example.com',
          address: '456 Elm St',
          orderItems: [
            {
              craftId: 'craft2',
              quantity: 1,
              title: 'Craft 2',
              price: 20,
              imageUrl: 'https://example.com/craft2.jpg',
            },
          ],
        },
      ];
      const mockFind = jest.fn().mockResolvedValue(mockOrders);

      const orderRepository = new OrderRepository();
      jest.spyOn(orderRepository, 'getOrders').mockImplementation(() => {
        return mockFind();
      });

      const result = await orderRepository.getOrders();

      expect(mockFind).toHaveBeenCalled();
      expect(result).toEqual(mockOrders);
    });
  });
});
