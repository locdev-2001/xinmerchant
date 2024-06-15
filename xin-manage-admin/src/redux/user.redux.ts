import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "src/redux/reducer";
import { userApi } from "@apis/user.api";
import moment from "moment";
import { setCookie } from "cookies-next";
import { IAdmin, ILoginRequest } from "src/models/user.model";

const login = createAsyncThunk(
  "users/login",
  async (
    data: ILoginRequest,
    { fulfillWithValue, rejectWithValue, getState }
  ) => {
    try {
      const res = await userApi.login(data);
      setCookie("access_token", res.accessToken, { path: "/" });
      return fulfillWithValue(res);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (data: undefined, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const user = await userApi.authenticate();
      return fulfillWithValue(user);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export interface UserState {
  admin: IAdmin;
  authenticated: boolean;
  loadingLogin: boolean;
  loadingAuthenticate: boolean;
}

export const initialState: UserState = {
  admin: null,
  authenticated: false,
  loadingLogin: false,
  loadingAuthenticate: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loadingLogin = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loadingLogin = false;
        state.authenticated = true;
        state.admin = payload.data
      })
      .addCase(login.rejected, (state, { error }) => {
        state.loadingLogin = false;
        state.admin = null;
      });

    builder
      .addCase(authenticate.pending, (state) => {
        state.loadingAuthenticate = true;
      })
      .addCase(authenticate.fulfilled, (state, { payload }) => {
        state.loadingAuthenticate = false;
        state.authenticated = true;
        state.admin = payload
      })
      .addCase(authenticate.rejected, (state, { error }) => {
        state.loadingAuthenticate = false;
        state.authenticated = false;
        state.admin = null;
      });
  },
});

export const userReducer = userSlice.reducer;
export const userSelector = (state: RootState) => state.user;
export const userActions = {
  login,
  authenticate,
};
