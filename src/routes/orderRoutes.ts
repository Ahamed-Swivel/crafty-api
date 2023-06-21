import { Router } from 'express'
import authenticateToken from '../middleware/authentication'
import { validateOrder } from '../middleware/validation'
import OrderController from '../controller/OrderController'

const orderRouter = Router()

/**
 * @openapi
 * paths:
 *  /api/order:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Order
 *      summary: Get all Orders
 *      operationId: order
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Order'
 *        500:
 *          description: Internal Server Error
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Order
 *      summary: Add a new order
 *      operationId: order
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Order'
 *      responses:
 *        '200':
 *          description: successful order
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CreateOrderResponse'
 *        '401':
 *          description: Invalid input
 */
orderRouter.get('/', authenticateToken, OrderController.getOrders)
orderRouter.post('/', validateOrder, OrderController.createOrder)

export default orderRouter
