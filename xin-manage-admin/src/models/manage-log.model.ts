import { IAdmin } from "./user.model";

export type IManageLogAction =
  | "change_email"
  | "update_rate"
  | "create_admin_account"
  | "update_admin_account"
  | "delete_admin_account";

export interface IManageLog {
  id: string;
  createdAt: string;
  updatedAt: string;
  data: any;
  admin: IAdmin;
  newData: any;
  action: IManageLogAction;
}
