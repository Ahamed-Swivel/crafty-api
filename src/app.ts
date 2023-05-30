import cors from 'cors'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import helmet from 'helmet'

import swaggerSpec from './swagger'
import craftRouter from './routes/craftRoutes'
import orderRouter from './routes/orderRoutes'
import analyticRouter from './routes/analyticsRoutes'
import authRoutes from './routes/authRoutes'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(
  cors({
    origin: ['https://*.vercel.app'],
    optionsSuccessStatus: 200,
  })
)
app.use('/', authRoutes)
app.use('/api/craft', craftRouter)
app.use('/api/order', orderRouter)
app.use('/api/analytics', analyticRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default app
