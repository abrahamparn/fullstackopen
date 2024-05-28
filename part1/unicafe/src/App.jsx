import { useState } from "react";
import "./App.css";

const Button = (props) => {
  return <button onClick={props.setFeedbackValue}>{props.text}</button>;
};
function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };
  return (
    <>
      <h1>Give Feedback</h1>
      <Button setFeedbackValue={handleGood} text="Good" />
      <Button setFeedbackValue={handleBad} text="Bad" />
      <Button setFeedbackValue={handleNeutral} text="Neutral" />

      <ul>
        <li>
          <p>good {good}</p>
        </li>
        <li>
          <p>bad {bad}</p>
        </li>
        <li>
          <p>neutral {neutral}</p>
        </li>
      </ul>
    </>
  );
}

export default App;
