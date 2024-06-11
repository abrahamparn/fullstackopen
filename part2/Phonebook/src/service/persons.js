import axios from "axios";

const baseurl = "/api/persons";

const getAll = async () => {
  const request = axios.get(baseurl);
  const response = await request;
  return response.data;
};

const createPerson = async (newObject) => {
  const request = axios.post(baseurl, newObject);
  const response = await request;
  return response.data;
};

const deletePerson = async (id) => {
  const request = axios.delete(`${baseurl}/${id}`);
  const response = await request;
  return response.data;
};

const updatePerson = async (id, newObject) => {
  const request = axios.put(`${baseurl}/${id}`, newObject);
  const response = await request;
  return response.data;
};
export default {
  getAll,
  createPerson,
  deletePerson,
  updatePerson,
};
