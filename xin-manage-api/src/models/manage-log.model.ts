import { Schema, Types, model } from "mongoose";
import BaseModel from ".";
import { AdminDTO, IAdmin } from "./admin.model";

export type TManageLogAction =
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
  adminId: string;
  newData: any;
  action: TManageLogAction;
}

export class ManageLog extends BaseModel {
  data: any;
  adminId: string;
  newData: any;
  action: TManageLogAction;

  constructor(obj: IManageLog) {
    super(obj);
    this.data = obj?.data;
    this.adminId = obj?.adminId;
    this.newData = obj?.newData;
    this.action = obj?.action;
  }
}

export interface IManageLogDTO {
  id: string;
  createdAt: string;
  updatedAt: string;
  data: any;
  admin: AdminDTO;
  newData: any;
  action: TManageLogAction;
}

export class ManageLogDTO extends BaseModel {
  data: any;
  admin: AdminDTO;
  newData: any;
  action: TManageLogAction;

  constructor(obj: IManageLogDTO) {
    super(obj);
    this.data = obj?.data;
    this.admin = new AdminDTO(obj.admin as any);
    this.newData = obj?.newData;
    this.action = obj?.action;
  }
}

const manageLogSchema = new Schema({
  adminId: { type: Types.ObjectId, ref: "admin_manage" },
  data: Object,
  newData: Object,
  action: String,
  createdAt: Date,
  updatedAt: Date,
});

manageLogSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export const ManageLogModel = model<IManageLog>(
  "manage_log",
  manageLogSchema,
  "manage_log"
);
