import { IAdmin, ILoginRequest, ILoginResponse } from "src/models/user.model";
import { axiosClient } from "./axios-client";

const paths = {
  login: "/v1/admin/login",
  authenticate: "/v1/admin/profile",
  changeEmail: "/v1/user/change-email",
};

const login = (data: ILoginRequest) => {
  return axiosClient<ILoginResponse>({
    url: paths.login,
    method: "POST",
    data: {
      ...data,
      role: "super_admin",
    },
  });
};

const authenticate = (accessToken?: string) => {
  return axiosClient<IAdmin>({
    url: paths.authenticate,
    method: "GET",
    headers: accessToken
      ? {
          Authorization: "Bearer " + accessToken,
        }
      : {},
  });
};

const changeEmail = (data: { email: string; newEmail: string }) => {
  return axiosClient({
    url: paths.changeEmail,
    method: "PUT",
    data,
  });
};

export const userApi = {
  login,
  authenticate,
  changeEmail,
};
