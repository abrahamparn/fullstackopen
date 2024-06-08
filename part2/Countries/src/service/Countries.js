import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getCountries = async () => {
  try {
    const request = axios.get(baseUrl);
    const response = await request;
    return response.data;
  } catch (error) {
    console.error("Error fetching countries data:", error);
  }
};

export default {
  getCountries,
};
