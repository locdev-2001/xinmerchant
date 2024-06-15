import { IDataPaginate } from "src/models/utils";
import { axiosClient } from "./axios-client";
import { IManageLog } from "src/models/manage-log.model";

const path = {
  listLogs: "/v1/statistics/logs",
};

const listLogs = (params: {page: number, limit: number}) => {
  return axiosClient<IDataPaginate<IManageLog>>({
    url: path.listLogs,
    method: "GET",
    params
  });
};

export const manageLogApi = {
  listLogs,
};
