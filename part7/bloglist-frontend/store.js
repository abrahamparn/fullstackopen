import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./src/reducer/notificationReducer";
import blogReducer from "./src/reducer/blogReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
});

export default store;
