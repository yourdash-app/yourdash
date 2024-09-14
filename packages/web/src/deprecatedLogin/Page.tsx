/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/chiplet/components/card/Card.tsx";
import React, { useEffect, useState } from "react";
import InstanceInfo from "./views/instanceInfo/InstanceInfo.tsx";
import InstanceSelector from "./views/instanceSelector/InstanceSelector.tsx";
import UserLogin from "./views/userLogin/UserLogin.tsx";
import YourDashLoginSlides from "./views/yourdashLoginSlides/YourDashLoginSlides.tsx";
import styles from "./loginPage.module.scss";

const Page: React.FC = () => {
  const [instanceHostname, setInstanceHostname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (localStorage.getItem("current_server") && localStorage.getItem("current_server") !== instanceHostname)
      setInstanceHostname(localStorage.getItem("current_server") as string);
  }, []);

  return (
    <main className={styles.page}>
      <Card showBorder className={"[transition:var(--transition-slower)] min-w-[32rem] max-w-full w-full overflow-hidden animate__animated animate__fadeIn"}>
        {instanceHostname ? (
          <UserLogin password={password} setPassword={setPassword} setUsername={setUsername} setInstanceHostname={setInstanceHostname} username={username} />
        ) : (
          <InstanceSelector
            setInstanceUrl={(value) => {
              setInstanceHostname(value);
              localStorage.setItem("current_server", value);
            }}
          />
        )}
      </Card>
      <Card showBorder className={`${styles.secondary} animate__animated animate__fadeIn`}>
        {instanceHostname ? <InstanceInfo /> : <YourDashLoginSlides />}
      </Card>
    </main>
  );
};

export default Page;
