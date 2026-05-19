import { Lead } from "./lead.model";

export class LeadService {
  static async create(data: any) {
    return Lead.create(data);
  }

  static async getAll(query: any, user: { id: string, role: string }) {
    const { status, source, search, sort, page = 1 } = query;

    const filter: any = {};
    if (user.role !== "admin") {
      filter.userId = user.id;
    }

    if (status) filter.status = status;
    if (source) filter.source = source;

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const limit = 10;
    const skip = (page - 1) * limit;

    const sortOption = sort === "oldest" ? 1 : -1;

    const [data, total] = await Promise.all([
      Lead.find(filter)
        .sort({ createdAt: sortOption })
        .skip(skip)
        .limit(limit),
      Lead.countDocuments(filter)
    ]);

    return {
      data,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      totalRecords: total
    };
  }

  static async getById(id: string, user: { id: string, role: string }) {
    const filter: any = { _id: id };
    if (user.role !== "admin") {
      filter.userId = user.id;
    }
    return Lead.findOne(filter);
  }

  static async update(id: string, data: any, user: { id: string, role: string }) {
    const filter: any = { _id: id };
    if (user.role !== "admin") {
      filter.userId = user.id;
    }
    return Lead.findOneAndUpdate(filter, data, { new: true });
  }

  static async delete(id: string, user: { id: string, role: string }) {
    const filter: any = { _id: id };
    if (user.role !== "admin") {
      filter.userId = user.id;
    }
    return Lead.findOneAndDelete(filter);
  }
}