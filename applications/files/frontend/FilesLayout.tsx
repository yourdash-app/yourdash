/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import SideBar, { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "@yourdash/chiplet/components/sideBar/SideBar";
import React from "react";
import FilePane from "./views/filePane/FilePane";

export interface IFilesLayout {
  children: React.ReactNode;
}

const FilesLayout: React.FC<IFilesLayout> = ({ children }) => {
  const [sidebarShortcuts, setSidebarShortcuts] = React.useState<{ path: string; type: "directory" | "file" }[] | null>(null);

  return (
    <div className={"grid grid-cols-[auto,1fr] h-full overflow-hidden"}>
      {/* <h1
        className={"font-semibold text-container-fg text-3xl text-center pt-2 pb-2"}
      >
        {trans( "APPLICATION_BRANDING" )}
      </h1>
      <div className={"flex flex-col gap-1"}>
          <div className={"w-full border-t-[1px] border-t-container-border"}/>
          <MajorButton>{trans( "CREATE" )}</MajorButton>
          <Button>{trans( "UPLOAD" )}</Button>
          <div className={"w-full border-t-[1px] border-t-container-border"}/>
          <h2 className={"pl-2 pr-2 pb-0.5 pt-2"}>{trans( "SHORTCUTS" )}</h2>
          {
            sidebarShortcuts
              ? sidebarShortcuts.map( shortcut => (
                <Button key={shortcut.path} className={"!pt-0.5 !pb-0.5"}>
                  <span className={"m-0"}>{path.basename( shortcut.path )}</span>
                </Button>
              ) )
              : (
                <Button>
                  Add Home shortcut?
                </Button>
              )
          }
        </div> */}

      <SideBar
        items={[
          {
            type: SIDEBAR_ITEM_TYPE.Button,
            label: "Upload File",
            icon: UKIcon.Upload,
            onClick: () => {
              return 0;
            },
          },
          {
            type: SIDEBAR_ITEM_TYPE.Separator,
            value: "sep1",
          },
        ]}
        title={"Files"}
        defaultState={SIDEBAR_STATE.NormalExpanded}
      />
      <FilePane />
    </div>
  );
};

export default FilesLayout;
