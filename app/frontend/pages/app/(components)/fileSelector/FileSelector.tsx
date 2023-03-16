import React, { useState } from "react";
import Chiplet from "~/chipletui";
import YourDashFileType from "../../../../../../packages/types/files/YourDashFileType";

export interface IFileSelector {
    allowedFileTypes: YourDashFileType[];
    singleFile: boolean;
    visible: boolean;
    onClose: () => void;
}

const FileSelector: React.FC<IFileSelector> = ({ allowedFileTypes, singleFile, visible, onClose }) => {
    const [selectedFiles, setSelectedFiles] = useState([] as string[]);

    return <Chiplet.Dialog visible={visible} onClose={onClose}></Chiplet.Dialog>;
};

export default FileSelector;
