import { createSlice } from "@reduxjs/toolkit";
import userListService from "../services/userList";
import { setNotification } from "./notificationReducer";

const userListSlice = createSlice({
  name: "userList",
  initialState: [],
  reducers: {
    setUserList(state, action) {
      return action.payload;
    },
  },
});
export const { setUserList } = userListSlice.actions;

export const fetchUserList = () => {
  return async (dispatch) => {
    try {
      const newUserList = await userListService.getAllUsers();
      dispatch(setUserList(newUserList));
    } catch (error) {
      dispatch(setNotification("Cannot fetch user list."));
    }
  };
};

export default userListSlice.reducer;
