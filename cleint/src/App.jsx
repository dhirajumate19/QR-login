import { createContext, useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./components/counter";
import ExpesiveComp from "./components/expesiveCompinet";
import { UseEffectDemo } from "./components/useeffect";

const myContext = createContext();

function MyComonent() {
  const value = useContext(myContext);
  return <div>{value}</div>;
}
function App() {
  return (
    <myContext.Provider value="hello boss">
      {/* <MyComonent /> */}
      <Counter />
      {/* <ExpesiveComp num={3} /> */}
      <UseEffectDemo />
    </myContext.Provider>
  );
}

export default App;
