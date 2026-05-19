import { Router } from "express";
import {
  createLead,
  getLeads,
  getLead,
  updateLead,
  deleteLead,
  exportLeads
} from "./lead.controller";
import { protect } from "../../middleware/auth.middleware";
import { allowRoles } from "../../middleware/role.middleware";

const router = Router();

router.use(protect);

router.post("/", createLead);
router.get("/", getLeads);
router.get("/export", exportLeads);
router.get("/:id", getLead);
router.put("/:id", updateLead);
router.delete("/:id", allowRoles("admin"), deleteLead);

export default router;