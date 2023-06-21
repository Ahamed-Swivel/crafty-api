import { Router } from 'express'
import AuthController from '../controller/AuthController'

const authRoutes = Router()


/**
 * @openapi
 * paths:
 *  /login:
 *    post:
 *      tags:
 *        - Login
 *      summary: Login and get token
 *      operationId: login
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: successful login
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LoginSuccessResponse'
 *        '401':
 *          description: Invalid input
 */
authRoutes.post('/login', AuthController.login)
authRoutes.post('/sign-up', AuthController.signup)

export default authRoutes
