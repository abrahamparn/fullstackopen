import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import useCounter from "./customHooks/useCounter";
import useField from "./customHooks/useField";

const App = () => {
  const name = useField("text");
  const born = useField("date");
  const height = useField("number");

  return (
    <div>
      <form>
        name:
        <input {...name} />
        <br />
        birthdate:
        <input type={born.type} value={born.value} onChange={born.onChange} />
        <br />
        height:
        <input
          type={height.type}
          value={height.value}
          onChange={height.onChange}
        />
      </form>
      <div>
        {name.value} {born.value} {height.value}
      </div>
    </div>
  );
};
export default App;
