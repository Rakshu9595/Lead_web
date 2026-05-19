import express from "express";
import dotenv from "dotenv";
import authRoutes from "./modules/auth/auth.routes";
import leadRoutes from "./modules/leads/lead.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorHandler);

export default app;