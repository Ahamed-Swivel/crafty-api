import { Router } from 'express'
import authenticateToken from '../middleware/authentication'
import AnalyticsController from '../controller/AnalyticsController'

const analyticRouter = Router()

analyticRouter.get('/', authenticateToken, AnalyticsController.getAnalytics)

export default analyticRouter
