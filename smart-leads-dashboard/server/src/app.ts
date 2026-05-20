import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import leadRoutes from "./modules/leads/lead.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

// ✅ CORS CONFIG (IMPORTANT)
app.use(
  cors({
    origin: "https://lead-web-three.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ HANDLE PREFLIGHT REQUESTS
app.options("*", cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use(errorHandler);

export default app;
