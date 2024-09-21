import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../../service/anecdote";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    addVote(state, action) {
      const id = action.payload;
      const anecdoteToChange = state.find((n) => n.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
  },
});

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdote = () => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.getAll();
    dispatch(setAnecdotes(newAnecdote));
  };
};

export const addAnectdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const setNewVote = (id) => {
  return async (dispatch) => {
    const newVote = await anecdoteService.incraeseVoteNumber(id);
    dispatch(addVote(newVote.id));
  };
};

export default anecdoteSlice.reducer;
