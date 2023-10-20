/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import { Card } from "../../ui/index";
import InstanceInfo from "./views/instanceInfo/InstanceInfo";
import InstanceSelector from "./views/instanceSelector/InstanceSelector";
import UserLogin from "./views/userLogin/UserLogin";
import YourDashLoginSlides from "./views/yourdashLoginSlides/YourDashLoginSlides";

const Page: React.FC = () => {
  const [instanceHostname, setInstanceHostname] = useState<string>( "s" )
  const [username, setUsername] = useState<string>( "" )
  const [password, setPassword] = useState<string>( "" )
  
  return <main className={"bg-bg w-full h-full grid grid-rows-[auto,1fr] p-4 gap-4 lg:grid-cols-[auto,1fr] lg:grid-rows-none"}>
    <Card showBorder className={"[transition:var(--transition-slower)] min-w-[32rem] max-w-full w-full overflow-hidden animate__animated animate__fadeIn"}>
      {
        instanceHostname
          ? <UserLogin
            password={password}
            setPassword={setPassword}
            setUsername={setUsername}
            setInstanceHostname={setInstanceHostname}
            username={username}
          />
          : <InstanceSelector
            setInstanceUrl={( value ) => { setInstanceHostname( value ); localStorage.setItem( "current_server", value ) }}
          />
      }
    </Card>
    <Card
      showBorder
      className={"[transition:var(--transition-slower)] overflow-hidden animate__animated animate__fadeIn"}
    >
      {
        instanceHostname
          ? <InstanceInfo/>
          : <YourDashLoginSlides />
      }
    </Card>
  </main>;
}

export default Page;
