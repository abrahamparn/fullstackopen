import { useState } from "react";

const Header = (props) => {
  let course = props.course.name;
  console.log(course);
  return (
    <>
      <h1>{course}</h1>
    </>
  );
};

const Part = (props) => {
  let parts = props.course.parts;
  console.log(parts);
  return (
    <>
      <p>
        {parts[0].name} {parts[0].exercises}
      </p>
      <p>
        {parts[1].name} {parts[1].exercises}
      </p>
      <p>
        {parts[2].name} {parts[2].exercises}
      </p>
    </>
  );
};

const Total = (props) => {
  let parts = props.course.parts;
  console.log(parts);
  return (
    <p>
      Number of exercises{" "}
      {parts[0].exercises + parts[1].exercises + parts[2].exercises}
    </p>
  );
};

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Part course={course} />
      <Total course={course} />
    </div>
  );
}

export default App;
