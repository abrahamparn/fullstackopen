const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <h3>Number of exercises {sum}</h3>;

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
    <div key={course.key}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={totalExercises} />
    </div>
  );
};

export default Course;
