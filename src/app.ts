import cors from "cors";
import express from "express";
import swaggerUi from 'swagger-ui-express';

import craftRoutes from "./routes/craftRoutes";
import swaggerSpec from "./swagger";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['https://*.vercel.app'],
  optionsSuccessStatus: 200
}));
app.use("/api/craft", craftRoutes);
app.use("/api/order", craftRoutes);
app.use("/api/analytics", craftRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/login", craftRoutes);

export default app;
