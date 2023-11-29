/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import useTranslate from "web-client/src/helpers/i10n";
import { IconButton, Chip, Row } from "web-client/src/ui";
import { useNavigate } from "react-router-dom";
import WeatherHourlyConditionsWidget from "../../widgets/weather/WeatherHourlyConditions/WeatherHourlyConditionsWidget";
import styles from "./DashboardLayout.module.scss";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

export interface IDashboard {
  username: string,
  fullName: {
    first: string,
    last: string
  }
}

const DashboardLayout: React.FC<IDashboard> = ( {
  username,
  fullName
} ) => {
  const navigate = useNavigate();
  const trans = useTranslate( "dash" );
  return (
    <main
      className={"flex flex-col w-full min-h-full h-full overflow-y-auto"}
    >
      <header className={"p-6 pl-8 pr-8 flex flex-col from-container-bg to-transparent bg-gradient-to-b"}>
        <Row>
          <span className={"text-5xl font-bold [text-shadow:#242424bb_0_0_0.75rem,_#24242488_0_0_0.5rem,_#24242444_0_0_0.25rem]"}>
            {
              trans( "LOCALIZED_GREETING", [fullName.first, fullName.last] )
            }
          </span>
          <IconButton
            className={"ml-auto"}
            icon={YourDashIcon.Gear}
            onClick={() => {
              navigate( "/app/a/settings/personalization/dashboard" );
            }}
          />
        </Row>
        <Row className={"pt-6 flex-wrap child:flex-grow md:child:flex-grow-0"}>
          {/* Chips */}
          <Chip onClick={() => 0}>
            {"Weather 20°C"}
          </Chip>
          <Chip onClick={() => 0} active>
            {"Rain at 3pm"}
          </Chip>
          <Chip onClick={() => 0}>
            {"You have 76 unread notifications"}
          </Chip>
        </Row>
      </header>
      <section className={styles.content}>
        {/* Widgets */}
        <WeatherHourlyConditionsWidget />
      </section>
    </main>
  );
};

export default DashboardLayout;
