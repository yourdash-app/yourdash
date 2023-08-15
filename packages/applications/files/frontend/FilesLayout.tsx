import path from "path-browserify";
import React from "react";
import {Button, MajorButton} from "web-client/src/ui";
import useTranslate from "web-client/src/helpers/l10n";

export interface IFilesLayout {
  children: React.ReactNode;
}

const FilesLayout: React.FC<IFilesLayout> = ({children}) => {
  const [
    sidebarShortcuts,
    setSidebarShortcuts
  ] = React.useState<{ path: string, type: "directory" | "file" }[] | null>(null);
  const trans = useTranslate("files");

  return (
    <main className={"grid grid-cols-[auto,1fr] h-full"}>
      <section
        className={"flex flex-col min-h-full overflow-x-hidden overflow-y-auto pl-1 pr-1 border-0 border-r-[1px] border-container-border min-w-[10rem]"}
      >
        <h1
          className={"font-semibold text-container-fg text-3xl text-center pt-2 pb-2"}
        >
          {trans("APPLICATION_BRANDING")}
        </h1>

        <div className={"flex flex-col gap-1"}>
          <div className={"w-full border-t-[1px] border-t-container-border"}/>
          <MajorButton>{trans("CREATE")}</MajorButton>
          <Button>{trans("UPLOAD")}</Button>
          <div className={"w-full border-t-[1px] border-t-container-border"}/>
          <h2 className={"pl-2 pr-2 pb-0.5 pt-2"}>{trans("SHORTCUTS")}</h2>
          {
            sidebarShortcuts
              ? sidebarShortcuts.map(shortcut => (
                <Button key={shortcut.path} className={"!pt-0.5 !pb-0.5"}>
                  <span className={"m-0"}>{path.basename(shortcut.path)}</span>
                </Button>
              ))
              : (
                <Button>
                  Add Home shortcut?
                </Button>
              )
          }
        </div>
      </section>
      <section className={"flex flex-col w-full min-h-full overflow-auto"}>
        {children}
      </section>
    </main>
  );
};

export default FilesLayout;
