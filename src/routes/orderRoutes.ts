import { Router } from 'express'
import authenticateToken from '../middleware/authentication'
import { validateOrder } from '../middleware/validation'
import OrderController from '../controller/OrderController'

const orderRouter = Router()

orderRouter.get(
  '/',
  authenticateToken,
  validateOrder,
  OrderController.getOrders
)
orderRouter.post(
  '/',
  authenticateToken,
  validateOrder,
  OrderController.createOrder
)

export default orderRouter
