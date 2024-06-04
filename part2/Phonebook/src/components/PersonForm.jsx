import React from "react";

const PersonForms = ({
  addNewPerson,
  newName,
  handleNewName,
  newNumber,
  handleNewNumber,
}) => {
  return (
    <>
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
    </>
  );
};

export default PersonForms;
