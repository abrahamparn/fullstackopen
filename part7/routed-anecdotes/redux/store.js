import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducers";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;
