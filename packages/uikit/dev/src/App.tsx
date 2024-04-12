import { Component, createSignal } from "solid-js";
import Button from "../../components/button/button.js";

import logo from "./logo.svg";
import styles from "./App.module.css";

const App: Component = () => {
  const [testNum, setTestNum] = createSignal(0);

  return (
    <div class={styles.app}>
      <img
        src={logo}
        class={styles.logo}
        alt="logo"
      />
      {testNum()}
      <button
        onClick={() => {
          setTestNum(testNum() + 1);
        }}
      >
        Increment
      </button>

      <Button
        onClick={() => {
          console.log("button");
        }}
        text={"Button Text"}
      />
    </div>
  );
};

export default App;
