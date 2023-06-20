import { Router } from 'express'
import authenticateToken from '../middleware/authentication'
import { validateOrder } from '../middleware/validation'
import OrderController from '../controller/OrderController'

const orderRouter = Router()

orderRouter.get('/', authenticateToken, OrderController.getOrders)
orderRouter.post('/', validateOrder, OrderController.createOrder)

export default orderRouter
