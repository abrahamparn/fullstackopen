import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notificationChange(state, action) {
      return action.payload;
    },
  },
});

export const setNotification = (text, duration) => {
  return (dispatch) => {
    dispatch(notificationChange(text));
    setTimeout(() => {
      dispatch(notificationChange(null));
    }, duration);
  };
};

export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;
