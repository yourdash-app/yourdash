/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Card from "@yourdash/chiplet/components/card/Card";
import Chip from "@yourdash/chiplet/components/chip/Chip";
import Icon from "@yourdash/chiplet/components/icon/Icon";
import { UKIcon } from "@yourdash/uikit/src/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import Row from "@yourdash/chiplet/components/row/Row";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { modulePath } from "../../../meta.yourdash";
import WeatherHourlyConditionsWidget from "../../widgets/weather/WeatherHourlyConditions/WeatherHourlyConditionsWidget";
import styles from "./DashboardLayout.module.scss";
import { useState } from "react";

export interface IDashboard {
  username: string;
  fullName: {
    first: string;
    last: string;
  };
}

const DashboardLayout: React.FC<IDashboard> = ({ username, fullName }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [widgets, setWidgets] = useState<React.FC[]>([WeatherHourlyConditionsWidget]);
  const navigate = useNavigate();

  return (
    <main className={"flex flex-col w-full min-h-full h-full overflow-y-auto"}>
      <header className={"p-6 pl-8 pr-8 flex flex-col from-container-bg to-transparent bg-gradient-to-b"}>
        <Row>
          <span className={"text-5xl font-bold [text-shadow:#242424bb_0_0_0.75rem,_#24242488_0_0_0.5rem,_#24242444_0_0_0.25rem]"}>
            {fullName.first} {fullName.last}
          </span>
          <IconButton
            className={"ml-auto"}
            icon={UKIcon.Pencil}
            onClick={() => {
              setIsEditMode(!isEditMode);
            }}
          />
          <IconButton
            icon={UKIcon.Gear}
            onClick={() => {
              navigate(`${modulePath}/personalization/dashboard`);
            }}
          />
        </Row>
        <Row className={"pt-6 flex-wrap child:flex-grow md:child:flex-grow-0"}>
          {/* Chips */}
          <Chip onClick={() => 0}>{"Weather 20°C"}</Chip>
          <Chip
            onClick={() => 0}
            active
          >
            {"Rain at 3pm"}
          </Chip>
          <Chip onClick={() => 0}>{"You have 76 unread notifications"}</Chip>
        </Row>
      </header>
      <section className={styles.content}>
        {/* Widgets */}
        {widgets.map((Widget, index) => {
          if (isEditMode) {
            return (
              <div
                className={"@container"}
                key={Widget.name + index}
              >
                <Card
                  showBorder
                  key={Widget.name}
                  className={"flex items-center justify-center @lg:flex-row flex-col gap-2"}
                >
                  <h3>{Widget.displayName || Widget.name}</h3>
                  <Row>
                    {index !== 0 && (
                      <IconButton
                        icon={UKIcon.ChevronLeft}
                        onClick={() => {
                          // move left in array
                          setWidgets(widgets.slice(0, index - 1).concat(widgets.slice(index)));
                        }}
                      />
                    )}
                    <IconButton
                      icon={UKIcon.Trash}
                      onClick={() => {
                        setWidgets(widgets.slice(0, index).concat(widgets.slice(index + 1)));
                      }}
                    />
                    {index !== widgets.length - 1 && (
                      <IconButton
                        icon={UKIcon.ChevronRight}
                        onClick={() => {
                          // move right in array
                          setWidgets(
                            widgets
                              .slice(0, index)
                              .concat(widgets.slice(index + 1))
                              .concat(widgets.slice(index)),
                          );
                        }}
                      />
                    )}
                  </Row>
                </Card>
              </div>
            );
          }

          return <Widget key={Widget.name + index} />;
        })}
        {isEditMode && (
          <div
            className={styles.addWidget}
            onClick={() => {
              setWidgets(widgets.concat(WeatherHourlyConditionsWidget));
            }}
          >
            <Icon
              className={styles.icon}
              icon={UKIcon.Plus}
            />
            <div className={styles.label}>Add widget</div>
          </div>
        )}
      </section>
    </main>
  );
};

export default DashboardLayout;
