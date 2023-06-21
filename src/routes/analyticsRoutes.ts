import { Router } from 'express'
import authenticateToken from '../middleware/authentication'
import AnalyticsController from '../controller/AnalyticsController'

const analyticRouter = Router()

/**
 * @openapi
 * components:
 *  schemas:
 *    Analytics:
 *      required:
 *      - _id
 *      - totalQuantity
 *      - sumPrice
 *      - title
 *      - price
 *      - imageUrl
 *      type: array
 *      properties:
 *        _id:
 *           type: string
 *        totalQuantity:
 *           type: integer
 *        sumPrice:
 *           type: integer
 *        title:
 *           type: string
 *        price:
 *           type: integer
 *        imageUrl:
 *           type: string
 * paths:
 *  /api/analytics:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Analytics
 *      summary: Get analytic details
 *      operationId: analytic
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Analytics'
 *        500:
 *          description: Internal Server Error
 */
analyticRouter.get('/', authenticateToken, AnalyticsController.getAnalytics)

export default analyticRouter
