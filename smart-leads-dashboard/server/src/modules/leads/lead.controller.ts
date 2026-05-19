import { Request, Response } from "express";
import { LeadService } from "./lead.service";
import { asyncHandler } from "../../utils/asyncHandler";
import { sendResponse } from "../../utils/response";
import { generateCSV } from "../../utils/csv";

export const createLead = asyncHandler(async (req: any, res: Response) => {
  const lead = await LeadService.create({ ...req.body, userId: req.user.id });
  sendResponse(res, 201, true, "Lead created", lead);
});

export const getLeads = asyncHandler(async (req: any, res: Response) => {
  const data = await LeadService.getAll(req.query, req.user);
  sendResponse(res, 200, true, "Leads fetched", data);
});

export const getLead = asyncHandler(async (req: any, res: Response) => {
  const lead = await LeadService.getById(req.params.id as string, req.user);
  sendResponse(res, 200, true, "Lead fetched", lead);
});

export const updateLead = asyncHandler(async (req: any, res: Response) => {
  const lead = await LeadService.update(req.params.id as string, req.body, req.user);
  sendResponse(res, 200, true, "Lead updated", lead);
});

export const deleteLead = asyncHandler(async (req: any, res: Response) => {
  await LeadService.delete(req.params.id as string, req.user);
  sendResponse(res, 200, true, "Lead deleted");
});

export const exportLeads = asyncHandler(async (req: any, res: Response) => {
  const result = await LeadService.getAll(req.query, req.user);
  const csv = generateCSV(result.data);

  res.header("Content-Type", "text/csv");
  res.attachment("leads.csv");
  return res.send(csv);
});