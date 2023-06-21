import { Router } from 'express'
import authenticateToken from '../middleware/authentication'
import { validateCraft } from '../middleware/validation'
import CraftController from '../controller/CraftController'

const craftRouter = Router()


/**
 * @openapi
 * paths:
 *  /api/craft:
 *    get:
 *      tags:
 *        - Craft
 *      summary: Get all Craft
 *      responses:
 *        200:
 *          description: Success
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Craft'
 *        500:
 *          description: Internal Server Error
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Craft
 *      summary: Add new Craft
 *      parameters:
 *        - in: body
 *          name: body
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Craft'
 *      requestBody:
 *        description: Add new Craft
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AddNewCraftBody'
 *      responses:
 *        201:
 *          description: Created
 *          schema:
 *            $ref: '#/components/schemas/CreateCraftResponse'
 *        401:
 *          description: Unauthorize
 *        400:
 *          description: Bad Request
 *  /api/craft/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Craft
 *      summary: Get an craft by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the craft to retrieve
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Craft details
 *          schema:
 *            $ref: '#/components/schemas/CreateCraftResponse'
 *        404:
 *          description: Craft not found
 *        500:
 *          description: Server error
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags:
 *        - Craft
 *      summary: Delete an craft by ID
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the craft to delete
 *          required: true
 *          type: string
 *      responses:
 *        200:
 *          description: Deleted craft details
 *          schema:
 *            $ref: '#/components/schemas/CreateCraftResponse'
 *        404:
 *          description: Craft not found
 *        500:
 *          description: Server error
 *        401:
 *          description: Unauthorize
 *    patch:
 *      tags:
 *        - Craft
 *      summary: Update an craft by ID
 *      description: This can only be done by the logged in user.
 *      operationId: updateCraft
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID of the craft to update
 *          required: true
 *          schema:
 *            type: string
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        description: Update an existent craft
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateCraftBody'
 *      responses:
 *        default:
 *          description: successful operation
 */
craftRouter.post(
  '/',
  authenticateToken,
  validateCraft,
  CraftController.createCraft
)
craftRouter.get('/', CraftController.getCrafts)
craftRouter.get('/:itemId', authenticateToken, CraftController.getCraftById)
craftRouter.delete('/:itemId', authenticateToken, CraftController.disableCraft)
craftRouter.patch(
  '/:itemId',
  authenticateToken,
  validateCraft,
  CraftController.updateCraftId
)

export default craftRouter
