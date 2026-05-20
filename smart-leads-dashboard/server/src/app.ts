import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import leadRoutes from "./modules/leads/lead.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(cors())

// ✅ Preflight requests fix
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Error handler
app.use(errorHandler);

export default app;
