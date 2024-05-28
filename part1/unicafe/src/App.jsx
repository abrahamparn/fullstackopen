import { useState } from "react";
import "./App.css";

const Button = (props) => {
  return <button onClick={props.setFeedbackValue}>{props.text}</button>;
};
function App() {
  const [good, setGood] = useState(0);
  const [bad, setBad] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    const newGood = good + 1;
    setGood(newGood);
    setAll(all + 1);
  };
  const handleBad = () => {
    const newBad = bad + 1;
    setBad(newBad);
    setAll(all + 1);
  };
  const handleNeutral = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
    setAll(all + 1);
  };
  const Statistics = ({ good, bad, all }) => {
    return (
      <>
        <p>average {(good - bad) / all ? (good - bad) / all : 0}</p>
        <p>positive {(good / all) * 100 ? (good / all) * 100 : 0} %</p>
      </>
    );
  };
  return (
    <>
      <h1>Give Feedback</h1>
      <Button setFeedbackValue={handleGood} text="Good" />
      <Button setFeedbackValue={handleBad} text="Bad" />
      <Button setFeedbackValue={handleNeutral} text="Neutral" />

      <p>good {good}</p>
      <p>bad {bad}</p>
      <p>neutral {neutral}</p>
      <p>all {all}</p>
      <Statistics good={good} bad={bad} all={all} />
    </>
  );
}

export default App;
