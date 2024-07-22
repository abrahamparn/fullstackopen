import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote, addAnectdote } from "../reducers/anecdoteReducer";
import { notificationChange } from "../reducers/notificationReducer";
import anecdoteService from "../../service/anecdote";
export default function AnectdotesForm() {
  const dispatch = useDispatch();

  const handleAddAnectdote = async (event) => {
    try {
      event.preventDefault();
      const content = event.target.anectdote.value;
      const result = await anecdoteService.createNewAnecdote(content);
      dispatch(addAnectdote(content));
      event.target.anectdote.value = "";
      dispatch(notificationChange(`successfully adding "${content}"`));
      setTimeout(notificationChange(null), 5000);
    } catch (exception) {
      console.error("hohoho");
    }
  };
  return (
    <form onSubmit={handleAddAnectdote}>
      <div>
        <input name="anectdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
}
