import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/reducer";
import { userApi } from "@apis/user.api";
import { manageLogApi } from "@apis/manage-log.api";
import { IManageLog } from "src/models/manage-log.model";
import { IDataPaginate } from "src/models/utils";

export const listLogs = createAsyncThunk(
  "statistics/logs",
  async (params: {
    page: number;
    limit: number;
  }, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const data = await manageLogApi.listLogs(params);
      return fulfillWithValue(data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export interface ManageLogState {
  loadingGetListLogs: boolean;
  dataLogs: IDataPaginate<IManageLog>;
}

export const initialState: ManageLogState = {
  loadingGetListLogs: false,
  dataLogs: {
    data: [],
    paginate: {
      page: 1,
      limit: 10,
      totalRecords: 0,
      totalPages: 0,
    },
  },
};

export const manageLogSlice = createSlice({
  name: "manageLog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listLogs.pending, (state) => {
        state.loadingGetListLogs = true;
      })
      .addCase(listLogs.fulfilled, (state, { payload }) => {
        state.loadingGetListLogs = false;
        state.dataLogs = payload;
      })
      .addCase(listLogs.rejected, (state, { error }) => {
        state.loadingGetListLogs = false;
        state.dataLogs = {
          data: [],
          paginate: {
            page: 1,
            limit: 10,
            totalRecords: 0,
            totalPages: 0,
          },
        };
      });
  },
});

export const manageLogReducer = manageLogSlice.reducer;
export const manageLogSelector = (state: RootState) => state.manageLog;
export const manageLogActions = {
    listLogs
};
