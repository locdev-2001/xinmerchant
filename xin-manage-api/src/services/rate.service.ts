import { ManageLog, ManageLogModel } from "@models/manage-log.model";
import { RateDTO, RateModel } from "@models/rate.model";

export default class RateService {
  async getByName(name: string) {
    let rate = await RateModel.findOne({ name });
    return new RateDTO(rate as any);
  }

  async updateRateByName({
    name,
    rate,
    adminId,
  }: {
    name: string;
    rate: number;
    adminId: string;
  }) {
    let data = await RateModel.findOne({ name });

    let newRate = await RateModel.findOneAndUpdate(
      { name },
      { rate, updatedAt: new Date() },
      { new: true }
    );

    let log = new ManageLog({
      adminId,
      data: data?.toObject(),
      newData: { rate },
      action: "update_rate",
    } as any);
    log.preCreate();
    await ManageLogModel.create(log);

    return new RateDTO(newRate as any);
  }
}
