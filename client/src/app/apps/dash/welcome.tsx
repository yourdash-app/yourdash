import React, {useEffect, useState} from "react";
import csi from "helpers/csi";

import {Card, Carousel, IconButton} from "../../../ui";
import db from "../../../helpers/database";

const DashApplicationWelcome: React.FC = () => {
  const [userFullName, setUserFullName] = useState({
    first: "",
    last: ""
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    csi.getJson("/core/panel/user-full-name", res => {
      setUserFullName(res);
    });
  }, []);

  if (userFullName.first === "" && userFullName.last === "") {
    return null;
  }

  return (
    <div
      style={{
        backgroundImage: `url(${ localStorage.getItem(
          "current_server"
        ) }/login/background)`
      }}
      className={"flex items-center justify-center flex-col h-full w-full bg-center bg-cover relative"}
    >
      <Card className={"w-full max-w-[60rem] flex flex-col gap-6 pt-8 pb-8"}>
        <h1 className={"text-5xl font-semibold text-center"}>{`Welcome to YourDash, ${ db.get("user:full_name").first }`}</h1>
        <Carousel>
          <main className={"w-full flex items-center justify-center gap-4"}>
            <Card level={"secondary"} className={"h-64 aspect-square flex flex-col items-start justify-between"}>
              <p>
                {"Customize everything"}
              </p>
              <div className={"flex items-center justify-end w-full"}>
                <IconButton icon={"link-external-16"}/>
              </div>
            </Card>
            <Card level={"secondary"} className={"h-64 aspect-square flex flex-col items-start justify-between"}>
              <p>
                {"Customize everything"}
              </p>
              <div className={"flex items-center justify-end w-full"}>
                <IconButton icon={"link-external-16"}/>
              </div>
            </Card>
            <Card level={"tertiary"} className={"h-64 aspect-square flex flex-col items-start justify-between"}>
              <p>
                {"Customize everything"}
              </p>
              <div className={"flex items-center justify-end w-full"}>
                <IconButton icon={"link-external-16"}/>
              </div>
            </Card>
          </main>
          <main className={"w-full"}>
            <section>text</section>
            <section>text</section>
            <section>text</section>
          </main>
          <main className={"w-full"}>
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
