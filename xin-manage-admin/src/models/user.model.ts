import { Permission } from "@utils/constants";

export type TAdminRole = "super_admin" | "support" | "finance"
export type TPermission = keyof typeof Permission;

export interface IAdmin{
  id: string;
  email: string;
  role: TAdminRole;
  createdAt: string;
  updatedAt: string;
  permissions: TPermission[]
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  data: IAdmin;
}