import axios from "axios";
const baseUrl = "/api/blog";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const put = async (newObject) => {
  console.log(newObject);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(baseUrl + "/" + newObject.id, newObject, config);
  return response.data;
};

const doDelete = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl + "/" + id, config);

  return response.data;
};

const getById = async (newObject) => {
  const response = await axios.get(baseUrl + "/" + newObject);

  return response.data;
};

export default { getAll, setToken, create, put, doDelete, getById };
