import { Component, createSignal } from "solid-js";
import Button from "../../components/button/button.js";
import Card from "../../components/card/card.js";
import Icon from "../../components/icon/icon.js";
import { UKIcon } from "../../components/icon/iconDictionary.js";
import IconButton from "../../components/iconButton/iconButton.js";
import TextInput from "../../components/textInput/textInput.js";
import styles from "./App.module.css";
import logo from "./logo.svg";
import Flex from "../../components/flex/flex.jsx";

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
      <Button
        onClick={() => {
          setTestNum(testNum() + 1);
        }}
        text={"Increment"}
      />
      <Card level={0}>
        <Card level={1}>
          <Card level={2}>
            <Card level={3}>Test Card Content</Card>
            <Icon icon={UKIcon.Alert} />
            <IconButton
              icon={UKIcon.Alert}
              onClick={() => {
                return 0;
              }}
              accessibleLabel={"test icon button"}
            />
          </Card>
          <IconButton
            icon={UKIcon.Alert}
            onClick={() => {
              return 0;
            }}
            accessibleLabel={"test icon button"}
          />
        </Card>
        <div style={`display: flex; gap: 0.25rem;`}>
          <Button
            onClick={() => {
              setTestNum(testNum() + 1);
            }}
            text={"Increment"}
          />
          <IconButton
            icon={UKIcon.Alert}
            onClick={() => {
              return 0;
            }}
            accessibleLabel={"test icon button"}
          />
          <Button
            onClick={() => {
              setTestNum(testNum() + 1);
            }}
            text={"Increment"}
          />
        </div>
        <Flex direction={"row"}>
          <TextInput
            onChange={(val) => {
              console.log(val);
            }}
            placeholder={"Placeholder text"}
            icon={UKIcon.Accessibility}
          />
          <IconButton
            icon={UKIcon.Alert}
            onClick={() => {
              return 0;
            }}
            accessibleLabel={"test icon button"}
          />
          <Button
            onClick={() => {
              setTestNum(testNum() + 1);
            }}
            text={"Increment"}
          />
        </Flex>
      </Card>
    </div>
  );
};

export default App;
