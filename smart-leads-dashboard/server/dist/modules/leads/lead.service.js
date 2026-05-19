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
exports.LeadService = void 0;
const lead_model_1 = require("./lead.model");
class LeadService {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return lead_model_1.Lead.create(data);
        });
    }
    static getAll(query, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, source, search, sort, page = 1 } = query;
            const filter = {};
            if (user.role !== "admin") {
                filter.userId = user.id;
            }
            if (status)
                filter.status = status;
            if (source)
                filter.source = source;
            if (search) {
                filter.$or = [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ];
            }
            const limit = 10;
            const skip = (page - 1) * limit;
            const sortOption = sort === "oldest" ? 1 : -1;
            const [data, total] = yield Promise.all([
                lead_model_1.Lead.find(filter)
                    .sort({ createdAt: sortOption })
                    .skip(skip)
                    .limit(limit),
                lead_model_1.Lead.countDocuments(filter)
            ]);
            return {
                data,
                page: Number(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total
            };
        });
    }
    static getById(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: id };
            if (user.role !== "admin") {
                filter.userId = user.id;
            }
            return lead_model_1.Lead.findOne(filter);
        });
    }
    static update(id, data, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: id };
            if (user.role !== "admin") {
                filter.userId = user.id;
            }
            return lead_model_1.Lead.findOneAndUpdate(filter, data, { new: true });
        });
    }
    static delete(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = { _id: id };
            if (user.role !== "admin") {
                filter.userId = user.id;
            }
            return lead_model_1.Lead.findOneAndDelete(filter);
        });
    }
}
exports.LeadService = LeadService;
