import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

function App() {
  const [count, setCount] = useState(0);
  const [persons, setPersons] = useState([
    {
      name: "Abraham Naiborhu",
      number: "+62-813-8830-2150",
    },
    {
      name: "Arto Hellas",
      number: "+61-813-8830-2150",
    },
  ]);

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
    setPersons(persons.concat(personObject));
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
