import { configureStore } from "@reduxjs/toolkit";
import noteReducer, { createNote, appendNote, setNotes } from "../noteReducer";
import filterReducer, { filterChange } from "../reducers/filterReducer";
const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer,
  },
});

export default store;
