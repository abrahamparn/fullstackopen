import axios from "axios";

const baseUrl = "/api/notes/";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
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
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const request = axios.put(`${baseUrl}${id}`, newObject);
  const response = await request;
  console.log(response);
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
  setToken,
  doDelete: doDelete,
};
