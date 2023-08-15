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

import * as React from "react";
import csi from "web-client/src/helpers/csi";
import useTranslate from "web-client/src/helpers/l10n";
import { IconButton, Icon, RightClickMenu, Button } from "web-client/src/ui";
import clippy from "web-client/src/helpers/clippy";
import * as path from "path-browserify";
import TextPreview from "../preview/TextPreview";
import Preview from "../preview/Preview";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const DetailsLayout: React.FC = () => {
  const [currentPath, setCurrentPath] = React.useState( "/" );
  const [files, setFiles] = React.useState<{
    name: string,
    type: "dir" | "file",
    icon: string
  }[]>( [] );
  const trans = useTranslate( "files" );
  
  React.useEffect( () => {
    // eslint-disable-next-line consistent-return
    csi.postJson( "/app/files/get/thumbnails-small", { path: currentPath }, resp => {
      if ( Object.keys( resp.files ).length === 0 ) {
        return setFiles( [] );
      }
      
      setFiles( resp?.files || [] );
    } );
  }, [currentPath] );
  
  return (
    <>
      <section className={"p-2 flex flex-col bg-container-bg top-0 sticky gap-2 shadow-lg z-10"}>
        <div className={"flex items-center gap-2"}>
          <IconButton
            disabled={currentPath === "/"}
            onClick={() => {
              setCurrentPath( path.join( currentPath, ".." ) );
            }}
            icon={YourDashIcon.ChevronLeft16}
          />
          <span>{currentPath}</span>
        </div>
        {
          !path.extname( currentPath ) && (
            <div
              className={
                clippy(
                  "bg-container-bg pl-2 pr-2 text-left transition-colors [transition:var(--transition)] hover:[transition:var(--transition-fast)] flex items-center"
                )
              }
            >
              <Icon icon={YourDashIcon.Info16} className={"h-[calc(100%-0.35rem)] mr-1.5"} color={"rgb(var(--container-fg))"}/>
              <span className={"mr-auto"}>{trans( "NAME" )}</span>
              <span>{trans( "TYPE" )}</span>
            </div>
          )
        }
      </section>
      {
        path.extname( currentPath )
          ? (
            <Preview path={currentPath}/>
          )
          : (
            /* TODO: make columns adapt to screen width */
            <section className={"p-1 grid grid-cols-6 gap-2"}>
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
                    className={"w-full flex min-h-[6rem]"}
                  >
                    <Button
                      onClick={() => {
                        setCurrentPath( path.join( currentPath, file.name ) );
                      }}
                      className={
                        clippy(
                          "transition-colors rounded-none [transition:var(--transition)] hover:[transition:var(--transition-fast)] flex items-center w-full flex-col justify-center h-full text-center overflow-hidden rounded-md p-2 gap-1"
                        )
                      }
                    >
                      {
                        file.icon === ""
                          ? (
                            file.type === "dir"
                              ? <Icon icon={YourDashIcon.FileDirectory16}/>
                              : <Icon icon={YourDashIcon.File16}/>
                          )
                          : <img alt={""} src={`${ csi.getInstanceUrl() }${ file.icon }`}/>
                      }
                      <span className={"pl-2 pr-2 text-ellipsis"}>{file.name}</span>
                    </Button>
                  </RightClickMenu>
                ) )
              }
            </section>
          )}
    </>
  );
};

export default DetailsLayout;
