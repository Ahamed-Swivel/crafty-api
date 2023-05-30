import { Router } from 'express'
import AuthController from '../controller/AuthController'

const authRoutes = Router()
authRoutes.post('/login', AuthController.login)
authRoutes.post('/sign-up', AuthController.signup)

export default authRoutes
