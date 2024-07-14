const Note = ({ note, toggleImportance, deleteNotes }) => {
  const label = note.important ? "make not important" : "make important";
  return (
    <li className="note">
      {note.content}
      <button onClick={toggleImportance} data-testid="important-button">
        {label}
      </button>
      <button onClick={deleteNotes}>Delete id {note.id}</button>
    </li>
  );
};

export default Note;
