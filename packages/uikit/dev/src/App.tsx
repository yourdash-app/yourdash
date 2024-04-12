import { Component, createSignal } from "solid-js";
import Button from "../../components/button/button.js";
import Card from "../../components/card/card.js";
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
      <Card>
        <Card>
          <Card>
            <Card>Test Card Content</Card>
          </Card>
        </Card>
      </Card>
    </div>
  );
};

export default App;
