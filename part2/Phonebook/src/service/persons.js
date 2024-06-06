import axios from "axios";

const baseurl = "http://localhost:3001/persons";

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
export default {
  getAll,
  createPerson,
  deletePerson,
};
