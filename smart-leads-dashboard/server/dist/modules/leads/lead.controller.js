"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportLeads = exports.deleteLead = exports.updateLead = exports.getLead = exports.getLeads = exports.createLead = void 0;
const lead_service_1 = require("./lead.service");
const asyncHandler_1 = require("../../utils/asyncHandler");
const response_1 = require("../../utils/response");
const csv_1 = require("../../utils/csv");
exports.createLead = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lead = yield lead_service_1.LeadService.create(Object.assign(Object.assign({}, req.body), { userId: req.user.id }));
    (0, response_1.sendResponse)(res, 201, true, "Lead created", lead);
}));
exports.getLeads = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield lead_service_1.LeadService.getAll(req.query, req.user);
    (0, response_1.sendResponse)(res, 200, true, "Leads fetched", data);
}));
exports.getLead = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lead = yield lead_service_1.LeadService.getById(req.params.id, req.user);
    (0, response_1.sendResponse)(res, 200, true, "Lead fetched", lead);
}));
exports.updateLead = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lead = yield lead_service_1.LeadService.update(req.params.id, req.body, req.user);
    (0, response_1.sendResponse)(res, 200, true, "Lead updated", lead);
}));
exports.deleteLead = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield lead_service_1.LeadService.delete(req.params.id, req.user);
    (0, response_1.sendResponse)(res, 200, true, "Lead deleted");
}));
exports.exportLeads = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield lead_service_1.LeadService.getAll(req.query, req.user);
    const csv = (0, csv_1.generateCSV)(result.data);
    res.header("Content-Type", "text/csv");
    res.attachment("leads.csv");
    return res.send(csv);
}));
