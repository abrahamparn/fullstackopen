import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./service/persons";

function App() {
  const [count, setCount] = useState(0);
  const [persons, setPersons] = useState([]);
  const PhoneData = () => {
    personService.getAll().then((personData) => setPersons(personData));
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
      const confirmDeletion = window.confirm(
        `${personObject.name} is already added to the phonebook, replace the old phone number with the new one?`
      );
      if (confirmDeletion) {
        let changeNumber = persons.find((n) => n.name === personObject.name);

        console.log(changeNumber);
        changeNumber.number = personObject.number;
        personService
          .updatePerson(changeNumber.id, changeNumber)
          .then((result) => {
            setPersons(
              persons.map((person) =>
                person.name === result.name ? result : person
              )
            );
          });
        setNewName("");
        setNewNumber("");
      }

      return;
    }
    personService.createPerson(personObject).then((aPerson) => {
      setPersons(persons.concat(aPerson));
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
  const handleDeletePerson = (id, name) => {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${name}`
    );
    if (confirmDeletion) {
      personService
        .deletePerson(id)
        .then(() => setPersons(persons.filter((a) => a.id !== id)))
        .catch((error) => {
          console.error("Failed to delete person:", error);
          // Optionally, handle the error, e.g., show a notification to the user
        });
    }
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
      {/* <Persons
        persons={nameToShow}
        deleteOnePerson={() => {
          handleDeletePerson(nameToShow.id);
        }}
      /> */}
      {nameToShow.map((person) => [
        <Persons
          key={person.id}
          person={person}
          deleteOnePerson={() => {
            handleDeletePerson(person.id, person.name);
          }}
        />,
      ])}
    </>
  );
}

export default App;
