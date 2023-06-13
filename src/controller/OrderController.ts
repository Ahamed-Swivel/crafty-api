import { Request, Response } from 'express'

import logger from '../logger'
import OrderRepository from '../repository/OrderRepository'

class OrderController {
  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const order = await new OrderRepository().createOrder(req.body)
      res.status(201).send(order)
    } catch (error) {
      logger.error(error)
      res.status(400).send(error)
    }
  }

  public async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await new OrderRepository().getOrders()
      res.status(200).send(orders)
    } catch (error) {
      logger.error(error)
      res.status(500).send(error)
    }
  }
}

export default new OrderController()
