import React from "react";

const Persons = ({ person, deleteOnePerson }) => {
  return (
    <>
      <div>
        {person.name} ({person.number})
        <button onClick={deleteOnePerson}>delete</button>
      </div>
    </>
  );
};

export default Persons;
