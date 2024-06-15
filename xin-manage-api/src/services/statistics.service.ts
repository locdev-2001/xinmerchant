import { ManageLogDTO, ManageLogModel } from "@models/manage-log.model";

export default class StatisticsService {
  async listLogs(params: {
    paginate: {
      page: number;
      limit: number;
    };
  }) {
    let data = await ManageLogModel.find()
      .sort({ createdAt: -1 })
      .skip(params.paginate.limit * (params.paginate.page - 1))
      .limit(params.paginate.limit)
      .populate("adminId");

    let totalRecords = await ManageLogModel.find().countDocuments();

    return {
      data: data.map(
        (item) =>
          new ManageLogDTO({ ...item.toObject(), admin: item.adminId } as any)
      ),
      paginate: {
        ...params.paginate,
        totalRecords,
        totalPages: Math.ceil(totalRecords / params.paginate.limit),
      },
    };
  }
}
