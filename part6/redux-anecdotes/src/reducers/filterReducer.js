import { createSlice, current } from "@reduxjs/toolkit";

const initialState = "ALL";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    filterChange(state, action) {
      const filter = action.payload;
      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;

export const setNotification = (text, duration) => {
  return (dispatch) => {
    dispatch(filterChange(text));
    setTimeout(() => {
      dispatch(filterChange(null));
    }, duration);
  };
};

export default filterSlice.reducer;
