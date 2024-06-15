import {
  ManageLog,
  ManageLogModel,
  TManageLogAction,
} from "@models/manage-log.model";

export default class ManageLogService {
  async create({
    adminId,
    data,
    newData,
    action,
  }: {
    adminId: string;
    data: any;
    newData: any;
    action: TManageLogAction;
  }) {
    let log = new ManageLog({
      adminId,
      data,
      newData,
      action,
    } as any);
    log.preCreate();
    await ManageLogModel.create(log);
  }
}
