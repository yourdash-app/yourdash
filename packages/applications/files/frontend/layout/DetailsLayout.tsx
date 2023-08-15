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
import csi from "../../backend/src/helpers/csi";
import useTranslate from "../../backend/src/helpers/l10n";
import { IconButton, Icon, RightClickMenu, Button } from "../../../../ui";
import clippy from "../../backend/src/helpers/clippy";
import path from "path-browserify";
import { YourDashIcon } from "../../../../ui/components/icon/iconDictionary";

const DetailsLayout: React.FC = () => {
  const [currentPath, setCurrentPath] = React.useState( "/" );
  const [files, setFiles] = React.useState<{
    name: string,
    type: "dir" | "file"
  }[]>( [] );
  const trans = useTranslate( "files" );
  
  React.useEffect( () => {
    // eslint-disable-next-line consistent-return
    csi.postJson( "/app/files/get", { path: currentPath }, resp => {
      if ( Object.keys( resp.files ).length === 0 ) {
        return setFiles( [] );
      }
      
      setFiles( resp?.files || [] );
    } );
  }, [currentPath] );
  
  return (
    <>
      <section className={"p-2 flex flex-col bg-container-bg top-0 sticky pb-0 gap-1 shadow-lg z-10"}>
        <div className={"flex items-center gap-2"}>
          <IconButton
            onClick={() => {
              setCurrentPath( path.join( currentPath, ".." ) );
            }}
            icon={YourDashIcon.ChevronLeft16}
          />
          <span>{currentPath}</span>
        </div>
        <div
          className={
            clippy(
              "bg-container-bg pl-2 pr-2 pt-0.5 pb-0.5 text-left transition-colors [transition:var(--transition)] hover:[transition:var(--transition-fast)] flex items-center"
            )
          }
        >
          <Icon icon={YourDashIcon.Info16} className={"h-[calc(100%-0.35rem)] mr-1.5"} color={"rgb(var(--container-fg))"}/>
          <span className={"mr-auto"}>{trans( "NAME" )}</span>
          <span>{trans( "TYPE" )}</span>
        </div>
      </section>
      <section className={"p-0.5"}>
        {
          files.map( file => (
            <RightClickMenu
              key={file.name}
              items={[
                {
                  name: "Delete",
                  onClick() {
                    return 0;
                  }
                },
                {
                  name: "Pin to sidebar",
                  onClick() {
                    return 0;
                  }
                }
              ]}
              className={"w-full flex"}
            >
              <Button
                onClick={() => {
                  setCurrentPath( path.join( currentPath, file.name ) );
                }}
                className={
                  clippy(
                    "pl-2 pr-2 pt-0.5 pb-0.5 h-[unset] text-left transition-colors rounded-none [transition:var(--transition)] hover:[transition:var(--transition-fast)] flex items-center w-full"
                  )
                }
              >
                <Icon
                  icon={file.type === "file" ? YourDashIcon.File16 : YourDashIcon.FileDirectory16}
                  className={"h-[calc(100%-0.35rem)] mr-1.5"}
                  color={"rgb(var(--container-fg))"}
                />
                <span className={"mr-auto"}>{file.name}</span>
                <span>{file.type}</span>
              </Button>
            </RightClickMenu>
          ) )
        }
      </section>
    </>
  );
};

export default DetailsLayout;
