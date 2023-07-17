import React from "react";
import csi from "../../../../helpers/csi";
import useTranslate from "../../../../helpers/l10n";
import { IconButton, Icon, RightClickMenu, Button } from "../../../../ui";
import clippy from "../../../../helpers/clippy";
import path from "path-browserify";
import TextPreview from "../preview/TextPreview";
import Preview from "../preview/Preview";

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
            icon={"chevron-left-16"}
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
              <Icon name={"info-16"} className={"h-[calc(100%-0.35rem)] mr-1.5"} color={"rgb(var(--container-fg))"}/>
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
                              ? <Icon name={"file-directory-16"}/>
                              : <Icon name={"file-16"}/>
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
