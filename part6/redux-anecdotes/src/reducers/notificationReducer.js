import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    notificationChange(state, action) {
      const filter = action.payload;
      return action.payload;
    },
  },
});

export const { notificationChange } = notificationSlice.actions;
export default notificationSlice.reducer;
