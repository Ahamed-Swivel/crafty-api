import { Router } from 'express'
import authenticateToken from '../middleware/authentication'
import { validateCraft } from '../middleware/validation'
import CraftController from '../controller/CraftController'

const craftRouter = Router()

craftRouter.post(
  '/',
  authenticateToken,
  validateCraft,
  CraftController.createCraft
)
craftRouter.get('/', authenticateToken, CraftController.getCrafts)
craftRouter.get('/:itemId', authenticateToken, CraftController.getCraftById)
craftRouter.delete('/:itemId', authenticateToken, CraftController.disableCraft)
craftRouter.patch(
  '/:itemId',
  authenticateToken,
  validateCraft,
  CraftController.updateCraftId
)

export default craftRouter
