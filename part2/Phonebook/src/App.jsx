import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [persons, setPersons] = useState([
    {
      name: "Abraham Naiborhu",
    },
    { name: "Arto Hellas" },
  ]);

  const [newName, setNewName] = useState("");
  const addNewPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
    };
    setPersons(persons.concat(personObject));
    setNewName("");
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  return (
    <>
      <h2>Phoenbook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {persons.map((item, index) => {
        return <div key={index}>{item.name}</div>;
      })}
    </>
  );
}

export default App;
