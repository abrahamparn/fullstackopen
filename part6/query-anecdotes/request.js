import axios from "axios";
import { useNotification } from "./src/utils/NotificationContext";

const baseUrl = "http://localhost:3001/anecdotes";
export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) =>
  axios
    .post(baseUrl, newAnecdote)
    .then((res) => res.data)
    .catch((error) => {
      console.log(error.response.data.error);
      if (error.response) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An unknown error occurred");
      }
    });

export const addVoteNumber = (updatedAnecdote) =>
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);
