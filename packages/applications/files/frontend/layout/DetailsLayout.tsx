/*
 * Copyright ©2023 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import csi from "web-client/src/helpers/csi";
import useTranslate from "helpers/l18n";
import { IconButton, Icon, RightClickMenu, Button } from "web-client/src/ui";
import clippy from "helpers/clippy";
import path from "path-browserify";
import { YourDashIcon } from "web-client/src/ui/components/icon/iconDictionary";

const DetailsLayout: React.FC = () => {
  const [ currentPath, setCurrentPath ] = React.useState( "/" );
  const [ files, setFiles ] = React.useState<{
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
  }, [ currentPath ] );

  return (
    <>
      <section className={"p-2 flex flex-col bg-container-bg top-0 sticky pb-0 gap-1 shadow-lg z-10"}>
        <div className={"flex items-center gap-2"}>
          <IconButton
            onClick={() => {
              setCurrentPath( path.join( currentPath, ".." ) );
            }}
            icon={YourDashIcon.ChevronLeft}
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
          <Icon icon={YourDashIcon.Info} className={"h-[calc(100%-0.35rem)] mr-1.5"} color={"rgb(var(--container-fg))"} />
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
                  icon={file.type === "file" ? YourDashIcon.File : YourDashIcon.FileDirectory}
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
