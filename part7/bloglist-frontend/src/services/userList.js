import axios from "axios";
const baseUrl = "/api/userList";

const getAllUsers = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getUserById = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAllUsers, getUserById };
