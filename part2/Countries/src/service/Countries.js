import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;

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

const getDataWeather = async (capitalCity) => {
  try {
    const request =
      axios.get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capitalCity}&aqi=no
    `);
    const response = await request;
    return response.data;
  } catch (err) {
    console.error("Error fetching countries data: ", error);
  }
};

export default {
  getCountries,
  getDataWeather,
};
