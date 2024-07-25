import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../../noteReducer";
import noteService from "../../services/notes";

export default function NoteForm() {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    console.log(content);
    dispatch(createNote(content));
  };
  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">ADD</button>
    </form>
  );
}
