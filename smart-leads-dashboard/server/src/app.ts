import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./modules/auth/auth.routes";
import leadRoutes from "./modules/leads/lead.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const app = express();

// ✅ CORS FIX (IMPORTANT)
app.use(
  cors({
    origin: [
      "https://lead-web-three.vercel.app",
      "https://lead-web-git-main-rakshitha-s-projects4.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// ✅ Preflight requests fix
app.options("*", cors());

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// Error handler
app.use(errorHandler);

export default app;
