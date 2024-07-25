import { useReducer } from "react";
import CounterContext from "./utils/CounterContext";
import { useContext } from "react";
import { useCoutnerValue } from "./utils/CounterContext";
import { useCounterDispatch } from "./utils/CounterContext";

const Display = () => {
  const counter = useCoutnerValue();
  return <div>{counter}</div>;
};

const Button = ({ type, label }) => {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};

const App = () => {
  return (
    <div>
      <Display />
      <div>
        <Button type="INC" label="+" />
        <Button type="DEC" label="-" />
        <Button type="ZERO" label="0" />
      </div>
    </div>
  );
};
export default App;
