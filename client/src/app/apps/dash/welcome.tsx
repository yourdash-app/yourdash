import React, { useEffect, useState } from "react";
import getJson from "helpers/fetch";
import clippy from "helpers/clippy";
import { Card, Carousel } from "../../../ui/index";

const DashApplicationWelcome: React.FC = () => {
  const [userFullName, setUserFullName] = useState({ first: "", last: "" });
  const [step, setStep] = useState(0);

  useEffect(() => {
    getJson(`/panel/user/name`, (res) => {
      setUserFullName(res);
    });
  }, []);

  if (userFullName.first === "" && userFullName.last === "") return <></>;

  return (
    <div
      style={{
        backgroundImage: `url(${localStorage.getItem(
          "current_server"
        )}/login/background)`,
      }}
      className={`flex items-center justify-center flex-col h-full w-full bg-center bg-cover relative`}
    >
      <Card>
        <h1>Welcome to YourDash</h1>
        <Carousel>
          <main className={`w-full`}>
            <section>text</section>
            <section>text</section>
            <section>text</section>
          </main>
          <main className={`w-full`}>
            <section>text</section>
            <section>text</section>
            <section>text</section>
          </main>
          <main className={`w-full`}>
            <section>text</section>
            <section>text</section>
            <section>text</section>
          </main>
        </Carousel>
      </Card>
    </div>
  );
};

export default DashApplicationWelcome;
