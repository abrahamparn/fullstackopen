import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (exception) {
    console.error("Cannot retrieve data");
  }
};

const createNewAnecdote = async (content) => {
  try {
    const object = {
      content,
      votes: 0,
    };
    const response = await axios.post(baseUrl, object);
    return response.data;
  } catch (exception) {
    console.error("error in createNewAnecdote", exception);
  }
};

export default { getAll, createNewAnecdote };
