import { useState, useEffect } from "react";

import Countries from "./service/Countries";

import "./App.css";
import Filter from "./component/Filter";
function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleNewFilter = (event) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    setLoading(true);
    const loadCountries = async () => {
      const item = await Countries.getCountries();
      if (item) {
        setCountries(item);
      }
    };
    loadCountries();
    setLoading(false);
  }, []);

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  const checkCountry = () => {
    if (filter === "" || filter === null) {
      return <h3>Search for a country</h3>;
    }

    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredCountries.length > 10) {
      return <h3>Too many matches, specify another filter</h3>;
    }

    if (filteredCountries.length > 1) {
      return filteredCountries.map((country, index) => (
        <div key={index}>
          <p>{country.name.common}</p>
          <button onClick={() => showCountryDetails(country)}>Show</button>
        </div>
      ));
    }

    if (filteredCountries.length === 1) {
      return renderCountryDetails(filteredCountries[0]);
    }

    return <h3>No matches found or wait for a while</h3>;
  };

  const renderCountryDetails = (country) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      </div>
    );
  };

  return (
    <>
      <h1>Search Country</h1>
      <Filter value={filter} onChange={handleNewFilter} />
      {loading ? (
        <h1>Wait for a second</h1>
      ) : (
        <>
          {selectedCountry ? (
            <div>
              <button onClick={() => setSelectedCountry(null)}>Back</button>
              {renderCountryDetails(selectedCountry)}
            </div>
          ) : (
            checkCountry()
          )}
        </>
      )}
    </>
  );
}

export default App;
