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

const incraeseVoteNumber = async (id) => {
  try {
    const getData = await axios.get(`${baseUrl}/${id}`);
    console.log("getData", getData.data);
    const newData = {
      content: getData.data.content,
      votes: Number(getData.data.votes) + 1,
    };
    console.log("${baseUrl}/${id}", `${baseUrl}/${id}`);
    const response = await axios.put(`${baseUrl}/${id}`, newData);
    console.log("response", response);

    return response.data;
  } catch (exception) {
    console.error(exception);
  }
};

export default { getAll, createNewAnecdote, incraeseVoteNumber };
