import { useState } from "react";

const NoteForm = ({ createNote, userId }) => {
  const [newNote, setNewNote] = useState("");

  const addNote = (event) => {
    event.preventDefault();

    createNote({
      content: newNote,
      important: Math.random() < 0.5,
      userId: userId,
    });

    setNewNote("");
  };

  const handleChane = (event) => [setNewNote(event.target.value)];
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChane}
          placeholder="write note content here"
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
