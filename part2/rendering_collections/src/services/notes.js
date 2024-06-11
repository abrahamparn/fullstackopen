import axios from "axios";

const baseUrl = "/api/notes/";

// const getAll = async () => {
//   const request = axios.get(baseUrl);
//   const response = await request;
//   return response.data;
// };
const getAll = () => {
  const request = axios.get(baseUrl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    important: true,
  };
  return request.then((response) => response.data.concat(nonExisting));
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}${id}`, newObject);
  const response = await request;
  return response.data;
};

const doDelete = async (id) => {
  const request = axios.delete(`${baseUrl}${id}`);
  const response = await request;
  if (response.status === 200) {
    console.log(response.data);
    return response.data;
  }
  if (response.status === 400) {
    throw new Error("Cannot find id in database");
  }
};
export default {
  getAll,
  create,
  update,
  doDelete: doDelete,
};
