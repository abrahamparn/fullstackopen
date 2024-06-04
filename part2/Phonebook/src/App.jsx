import { useState } from "react";

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
      <div>
        filter shown with <input value={newSearch} onChange={handleNewSearch} />
      </div>
      <h2>New Entry</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {nameToShow.map((item, index) => {
        return (
          <div key={index}>
            {item.name} ({item.number})
          </div>
        );
      })}
    </>
  );
}

export default App;
