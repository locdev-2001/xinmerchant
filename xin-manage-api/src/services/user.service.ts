import { ManageLog, ManageLogModel } from "@models/manage-log.model";
import { UserDTO, UserModel } from "@models/user.model";

export default class UserService {
  async updateEmail(params: {
    adminId: string;
    email: string;
    newEmail: string;
  }) {
    let user = await UserModel.findOne({ email: params.email });
    await UserModel.updateOne(
      { email: params.email },
      { email: params.newEmail }
    );

    let log = new ManageLog({
      adminId: params.adminId,
      data: new UserDTO(user as any),
      newData: { email: params.newEmail },
      action: "change_email"
    } as any);
    log.preCreate();
    await ManageLogModel.create(log);

    return new UserDTO({
      ...(user?.toObject() as any),
      email: params.newEmail,
    });
  }
}
