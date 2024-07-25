import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../../noteReducer";
import noteService from "../../services/notes";

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();

  const handleToggleImportance = async (id) => {
    try {
      const response = await noteService.changeContent(id);
      dispatch(toggleImportanceOf(id));
    } catch (exception) {
      console.error("error in changing data");
    }
  };
  const notes = useSelector(({ notes, filter }) => {
    if (filter === "ALL") {
      return notes;
    } else if (filter === "IMPORTANT") {
      return notes.filter((note) => note.important);
    } else {
      return notes.filter((note) => !note.important);
    }
  });

  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => handleToggleImportance(note.id)}
        />
      ))}
    </ul>
  );
};

export default Notes;
