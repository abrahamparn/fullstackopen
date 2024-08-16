import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, httpStatus: null },
  reducers: {
    notificationChange(state, action) {
      return action.payload;
    },
  },
});

export const setNotification = (message, httpStatus, duration) => {
  return (dispatch) => {
    dispatch(notificationChange({ message, httpStatus }));
    setTimeout(() => {
      dispatch(notificationChange({ message: null, httpStatus: null }));
    }, duration);
  };
};

export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;
