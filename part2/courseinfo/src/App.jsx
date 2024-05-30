const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Number of exercises {sum}</p>;

const Part = ({ part }) => (
  <p key={part.id}>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part part={part} key={part.id} />
    ))}
  </>
);

const Course = ({ course }) => {
  console.log("course", course);
  console.log("parts0", "Hebat", course["parts"]);
  const totalExercises = course.parts.reduce(
    (total, part) => total + part.exercises,
    0
  );
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalExercises} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
