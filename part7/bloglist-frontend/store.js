import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./src/reducer/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
});

export default store;
