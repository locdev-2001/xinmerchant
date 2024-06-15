import { IAdmin } from "src/models/user.model";
import { axiosClient } from "./axios-client";
import { IDataPaginate } from "src/models/utils";

const path = {
  create: "/v1/admin",
  updateById: (id: string) => `/v1/admin/${id}`,
  deleteById: (id: string) => `/v1/admin/${id}`,
  list: "/v1/admin",
};

const create = (data: IAdmin) => {
  return axiosClient({
    url: path.create,
    method: "POST",
    data,
  });
};

const updateById = (id: string, data: IAdmin) => {
  return axiosClient({
    url: path.updateById(id),
    method: "PUT",
    data,
  });
};

const deleteById = (id: string) => {
  return axiosClient({
    url: path.deleteById(id),
    method: "DELETE",
  });
};

const list = (params: { page: number; limit: number }) => {
  return axiosClient<IDataPaginate<IAdmin>>({
    url: path.list,
    method: "GET",
    params,
  });
};

const getById = (id: string) => {
  return axiosClient<IAdmin>({
    url: path.updateById(id),
    method: "GET",
  });
};

export const adminAccountApi = {
  create,
  updateById,
  deleteById,
  list,
  getById,
};
