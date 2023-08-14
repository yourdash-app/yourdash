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

import React from "react";

import csi from "web-client/src/helpers/csi";
import { useNavigate } from "react-router-dom";
import clippy from "web-client/src/helpers/clippy";
import { RightClickMenu } from "../../../../ui";
import Panel, { YourDashLauncherApplication } from "../../Panel";
import { useTranslateAppCoreUI } from "web-client/src/helpers/l10n";


export interface ILauncherGridView {
  applications: YourDashLauncherApplication[],
  setVisible: ( value: boolean ) => void,
  searchValue: string
}

const LauncherGridView: React.FC<ILauncherGridView> = ( {
  applications,
  setVisible,
  searchValue
} ) => {
  const trans = useTranslateAppCoreUI();
  const navigate = useNavigate();
  return (
    <section
      className={clippy(
        `
            bg-container-bg
            grid
            grid-cols-4
            items-center
            justify-center
            gap-2
            p-2
            child:rounded-button-rounding
            child:bg-button-bg
            child-hover:bg-button-hover-bg
            child-active:bg-button-active-bg
            child:text-button-fg
            child-hover:text-button-hover-fg
            child-active:text-button-active-fg
            child:flex
            child:items-center
            child:justify-center
            child:flex-col
            child:cursor-pointer
            child:select-none
            child:transition-[var(--transition)]
            child-active:transition-[var(--transition)]
            child-hover:transition-[var(--transition-fast)]
            child:aspect-square
          `
      )}
    >
      {applications.length !== 0
        ? (
          applications.map( app => {
            if ( searchValue !== "" ) {
              if (
                !app.description.includes( searchValue ) &&
                !app.name.includes( searchValue )
              ) {
                return null;
              }
            }
            
            return (
              <button
                type={"button"}
                key={app.name}
                onClick={() => {
                  setVisible( false );
                  navigate( `/app/a/${ app.name }` );
                }}
                className={"group p-2"}
              >
                <RightClickMenu
                  className={"w-full flex flex-col items-center justify-center gap-2"}
                  key={app.name}
                  items={[
                    {
                      name: "Pin to Panel",
                      onClick() {
                        csi.postJson(
                          "/core/panel/quick-shortcuts/create",
                          {
                            displayName: app.displayName,
                            name: app.name
                          },
                          () => {
                            setTimeout( () => {
                              // @ts-ignore
                              // eslint-disable-next-line no-use-before-define
                              Panel.reload();
                              // eslint-disable-next-line no-magic-numbers
                            }, 100 );
                          }
                        );
                      }
                    },
                    {
                      name: "Open in new tab",
                      onClick() {
                        window.open( `${ window.location.origin }#/app/a/${ app.name }`, "_blank" );
                        setVisible( false );
                      }
                    },
                    {
                      name: "Show in AppStore",
                      onClick() {
                        navigate( `/app/a/store/app/${ app.name }` );
                        setVisible( false );
                      }
                    }
                  ]}
                >
                  <img src={app.icon} alt={""} className={"w-[98px] aspect-square shadow-md rounded-3xl group-active:shadow-inner"}/>
                  <span>{app.displayName}</span>
                </RightClickMenu>
              </button>
            );
          } )
        )
        : (
          <div
            className={"col-span-4 bg-container-bg h-20 flex items-center justify-center"}
          >
            <span className={"!text-container-fg !border-none"}>
              {trans( "You currently have no applications installed" )}
            </span>
          </div>
        )}
    </section>
  );
};

export default LauncherGridView;
