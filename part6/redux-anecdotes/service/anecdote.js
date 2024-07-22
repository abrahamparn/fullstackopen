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

export default { getAll };
