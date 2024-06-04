import React from "react";

const Persons = ({ persons }) => {
  return (
    <>
      {persons.map((item, index) => {
        return (
          <div key={index}>
            {item.name} ({item.number})
          </div>
        );
      })}
    </>
  );
};

export default Persons;
