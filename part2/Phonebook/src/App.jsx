import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [count, setCount] = useState(0);
  const [persons, setPersons] = useState([]);
  const PhoneData = () => {
    const promise = axios.get("http://localhost:3001/persons");
    const eventHandler = (response) => {
      setPersons(response.data);
    };
    promise.then(eventHandler);
  };

  useEffect(PhoneData, []);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const nameToShow =
    newSearch === false
      ? persons
      : persons.filter((item) =>
          item.name.toLowerCase().includes(newSearch.toLowerCase())
        );
  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString(),
    };
    const personExsist = persons.some(
      (person) => person.name === personObject.name
    );

    if (personExsist) {
      alert(`${personObject.name} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }
    const setToDatabase = axios
      .post("http://localhost:3001/persons", personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
      });
    setNewName("");
    setNewNumber("");
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value);
  };
  return (
    <>
      <h2>Phoenbook</h2>
      <Filter value={newSearch} onChange={handleNewSearch} />

      <h2>New Entry</h2>

      <PersonForm
        addNewPerson={addNewPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Persons persons={nameToShow} />
    </>
  );
}

export default App;
