import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./src/reducer/notificationReducer";
import blogReducer from "./src/reducer/blogReducer";
import loginReducer from "./src/reducer/loginReducer";
import userListReducer from "./src/reducer/userListReducer";
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: loginReducer,
    userList: userListReducer,
  },
});

export default store;
