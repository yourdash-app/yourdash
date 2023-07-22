/*
 * Copyright (c) 2023 YourDash contributors.
 * YourDash is licensed under the MIT License.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clippy from "../../../../helpers/clippy";
import csi from "../../../../helpers/csi";
import { Icon, IconButton, Row, TextInput } from "../../../../ui";
import { PanelPosition, YourDashLauncherApplication } from "../../Panel";
import LauncherGridView from "../sharedComponents/LauncherGridView";
import LauncherDateAndTime from "../sharedComponents/LauncherDateAndTime";
import { useTranslateAppCoreUI } from "../../../../helpers/l10n";
import styles from "./PanelPopoutLauncher.module.scss";
import { YourDashIcon } from "../../../../ui/components/icon/iconDictionary";

const PanelApplicationLauncherPopOut: React.FC<{
  side: PanelPosition;
  visible: boolean;
  setVisible: ( value: boolean ) => void;
  num: number
}> = ( {
  side,
  visible,
  setVisible,
  num
} ) => {
  const trans = useTranslateAppCoreUI();
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = useState<{
    first: string;
    last: string;
  }>( {
    first: "",
    last: ""
  } );
  
  const [applications, setApplications] = useState<YourDashLauncherApplication[]>( [] );
  const [searchValue, setSearchValue] = useState<string>( "" );
  
  useEffect( () => {
    csi.getJson( "/core/panel/user-full-name", res => {
      setUserFullName( res );
    } );
    
    csi.getJson( "/core/panel/applications", res => {
      setApplications( res );
    } );
  }, [num] );
  
  return (
    <>
      <div
        className={clippy(
          side === PanelPosition.left && styles.left,
          side === PanelPosition.top && styles.top,
          side === PanelPosition.right && styles.right,
          side === PanelPosition.bottom && styles.bottom,
          styles.arrow,
          `
          h-4
          aspect-square
          bg-container-bg
          [border:solid_0.1rem_var(--application-panel-border)]
          absolute
          rotate-45
          animate__animated
          animate__faster
          opacity-0
          rounded-sm
        `,
          side === PanelPosition.top &&
          ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.bottom &&
          ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.left &&
          ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.right &&
          ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" )
        )}
      />
      <section
        className={clippy(
          side === PanelPosition.left && styles.left,
          side === PanelPosition.right && styles.right,
          side === PanelPosition.top && styles.top,
          side === PanelPosition.bottom && styles.bottom,
          styles.component,
          "animate__animated animate__faster",
          side === PanelPosition.top &&
          ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.bottom &&
          ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.left &&
          ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" ),
          side === PanelPosition.right &&
          ( visible ? "animate__fadeIn" : "animate__fadeOut select-none pointer-events-none" )
        )}
      >
        <section className={"flex items-center justify-center relative group bg-container-secondary-bg p-2 pl-3"}>
          <span className={"text-2xl mr-auto"}>{trans( "LOCALIZED_GREETING", [userFullName.first] )}</span>
          <TextInput
            className={"w-[2.25rem] h-[2.25rem] focus-within:w-64 transition-all"}
            onChange={val => {
              setSearchValue( val );
            }}
          />
          <div
            className={"absolute right-2 top-2 h-[2.25rem] w-[2.25rem] p-[0.35rem] group-focus-within:opacity-0" +
                        " pointer-events-none transition-all [border:0.125rem_solid_#00000000]"}
          >
            <Icon icon={YourDashIcon.Search16} color={"rgb(var(--container-fg))"}/>
          </div>
        </section>
        <LauncherGridView applications={applications} setVisible={setVisible} searchValue={searchValue}/>
        <section className={"flex items-center justify-center bg-container-secondary-bg p-2 pl-3"}>
          <LauncherDateAndTime/>
          <Row className={"ml-auto"}>
            <IconButton
              icon={YourDashIcon.Person16}
              onClick={() => {
                setVisible( false );
                navigate( "/app/a/profile" );
              }}
            />
            <IconButton
              icon={YourDashIcon.Gear16}
              onClick={() => {
                setVisible( false );
                navigate( "/app/a/settings" );
              }}
            />
            <IconButton
              icon={YourDashIcon.Logout}
              onClick={() => {
                setVisible( false );
                localStorage.removeItem( "session_token" );
                localStorage.removeItem( "username" );
                navigate( "/" );
              }}
            />
          </Row>
        </section>
      </section>
    </>
  );
};

export default PanelApplicationLauncherPopOut;
