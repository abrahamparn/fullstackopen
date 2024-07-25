import React from "react";
import Notes from "./components/Note";
import NoteForm from "./components/NoteForm";
import VisibilityFilter from "./components/VisibilityFilter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNotes, initializeNotes } from "../noteReducer";
import noteService from "../services/notes";
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeNotes());
  }, []);
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
