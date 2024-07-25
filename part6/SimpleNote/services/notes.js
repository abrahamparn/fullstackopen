import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, important: false };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const changeContent = async (id) => {
  try {
    const getDataResponse = await axios.get(`${baseUrl}/${id}`);
    const getData = getDataResponse.data;

    const updatedData = {
      ...getData,
      important: !getData.important,
    };

    const response = await axios.put(`${baseUrl}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error in changing data:", error);
    throw error; // Re-throw the error to handle it where the function is called
  }
};
export default { getAll, createNew, changeContent };
