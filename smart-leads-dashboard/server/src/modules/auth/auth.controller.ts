import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/response";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const user = await AuthService.register(req.body);
  sendResponse(res, 201, true, "User registered", user);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const data = await AuthService.login(req.body);
  sendResponse(res, 200, true, "Login successful", data);
});