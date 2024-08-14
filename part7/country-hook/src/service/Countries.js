import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/name/";

const getOneCountry = async (name) => {
  try {
    const request = axios.get(baseUrl + name);
    const response = await request;
    response.found = true;
    return response;
  } catch (error) {
    console.error("Error fetching coutnries data:", error);
  }
};

export default getOneCountry;
