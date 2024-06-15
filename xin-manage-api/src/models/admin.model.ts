import { Schema, model } from "mongoose";
import BaseModel from ".";

export const ListAdminRole = ["super_admin", "support", "finance"] as const;
export type TAdminRole = (typeof ListAdminRole)[number];

export interface IAdmin {
  id: string;
  email: string;
  password: string;
  role: TAdminRole;
  createdAt: string;
  updatedAt: string;
}

export class Admin extends BaseModel {
  email: string;
  password: string;
  role: string;

  constructor(obj: IAdmin) {
    super(obj);
    this.email = obj.email;
    this.password = obj.password;
    this.role = obj.role;
  }
}

export class AdminDTO extends BaseModel {
  email: string;
  role: string;

  constructor(obj: IAdmin) {
    super(obj);
    this.email = obj.email;
    this.role = obj.role;
  }
}

const adminSchema = new Schema({
  email: String,
  password: String,
  role: String,
  createdAt: Date,
  updatedAt: Date,
});

adminSchema.set("toObject", {
  transform: function (doc, ret) {
    ret.id = ret._id?.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export const AdminModel = model<IAdmin>(
  "admin_manage",
  adminSchema,
  "admin_manage"
);
