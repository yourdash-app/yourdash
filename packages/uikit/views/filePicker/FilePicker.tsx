/*
 * Copyright ©2024 @Ewsgit and YourDash contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React, { useState } from "react";
import Dialog from "../../depChiplet/components/dialog/Dialog";
import { YourDashIcon } from "../../depChiplet/components/icon/iconDictionary";
import SideBar, { SIDEBAR_ITEM_TYPE, SIDEBAR_STATE } from "../../depChiplet/components/sideBar/SideBar";

export interface FilePickerProps {
  acceptedFileTypes?: string[];
  onFileSelected?: (file: File) => void;
  setVisible: (val: boolean) => void;
  visible: boolean;
}

const FilePicker: React.FC<FilePickerProps> = ({ acceptedFileTypes, onFileSelected, visible, setVisible }) => {
  const [selctedFiles, setSelctedFiles] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState<string>("/");

  return (
    <Dialog visible={visible} onClose={() => setVisible(false)}>
      <SideBar
        title={"Select files"}
        items={[
          {
            label: "Home",
            onClick() {
              setCurrentPath("/");
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: YourDashIcon.Home,
          },
          {
            type: SIDEBAR_ITEM_TYPE.Separator,
            id: "sep1",
          },
          {
            label: "Upload",
            onClick() {
              // TODO: allow uploading of files
              return 0;
            },
            type: SIDEBAR_ITEM_TYPE.Button,
            icon: YourDashIcon.Upload,
          },
        ]}
        defaultState={SIDEBAR_STATE.NormalExpanded}
      />
      {"FilePicker component"}
    </Dialog>
  );
};

export default FilePicker;
