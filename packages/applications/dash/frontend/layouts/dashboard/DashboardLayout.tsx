/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import * as React from "react";
import useTranslate from "web-client/src/helpers/i18n";
import { IconButton, Chip, Row, Card, Icon } from "web-client/src/ui";
import { useNavigate } from "react-router-dom";
import WeatherHourlyConditionsWidget from "../../widgets/weather/WeatherHourlyConditions/WeatherHourlyConditionsWidget";
import styles from "./DashboardLayout.module.scss";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";
import { useState } from "react";

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
  const [ isEditMode, setIsEditMode ] = useState<boolean>( false );
  const [ widgets, setWidgets ] = useState<React.FC[]>( [ WeatherHourlyConditionsWidget ] );
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
              trans( "LOCALIZED_GREETING", [ fullName.first, fullName.last ] )
            }
          </span>
          <IconButton
            className={"ml-auto"}
            icon={YourDashIcon.Pencil}
            onClick={() => {
              setIsEditMode( !isEditMode );
            }}
          />
          <IconButton
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
        {
          widgets.map( ( Widget, index ) => {
            if ( isEditMode ) {
              return <div className={"@container"} key={Widget.name + index}>
                <Card
                  showBorder
                  key={Widget.name}
                  className={"flex items-center justify-center @lg:flex-row flex-col gap-2"}
                >
                  <h3>
                    {Widget.displayName || Widget.name}
                  </h3>
                  <Row>
                    {
                      index !== 0 && <IconButton
                        icon={YourDashIcon.ChevronLeft}
                        onClick={() => {
                          // move left in array
                          setWidgets( widgets.slice( 0, index - 1 ).concat( widgets.slice( index ) ) );
                        }}
                      />
                    }
                    <IconButton
                      icon={YourDashIcon.Trash}
                      onClick={() => {
                        setWidgets( widgets.slice( 0, index ).concat( widgets.slice( index + 1 ) ) );
                      }}
                    />
                    {
                      index !== widgets.length - 1 && <IconButton
                        icon={YourDashIcon.ChevronRight}
                        onClick={() => {
                          // move right in array
                          setWidgets( widgets.slice( 0, index ).concat( widgets.slice( index + 1 ) ).concat( widgets.slice( index ) ) );
                        }}
                      />
                    }
                  </Row>
                </Card>
              </div>
            }

            return <Widget key={Widget.name + index}/>
          } )
        }
        {
          isEditMode && <div
            className={ styles.addWidget }
            onClick={() => {
              setWidgets( widgets.concat( WeatherHourlyConditionsWidget ) );
            }}
          >
            <Icon
              className={ styles.icon }
              icon={ YourDashIcon.Plus }
            />
            <div className={ styles.label }>
              Add widget
            </div>
          </div>
        }
      </section>
    </main>
  );
};

export default DashboardLayout;
