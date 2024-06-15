import { combineReducers } from "@reduxjs/toolkit";

/* PLOP_INJECT_IMPORT */
import { userReducer } from "./user.redux";
import { manageLogReducer } from "./manage-log.redux";

const rootReducer = combineReducers({
  /* PLOP_INJECT_USE */
  user: userReducer,
  manageLog: manageLogReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
