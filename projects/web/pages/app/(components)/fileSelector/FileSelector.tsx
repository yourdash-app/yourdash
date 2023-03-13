import React from "react";
import Chiplet from "ui";
import YourDashFileType from "../../../../../../packages/types/files/YourDashFileType";

export interface IFileSelector {
    children: React.ReactNode;
    allowedFileTypes: YourDashFileType[];
}

const FileSelector: React.FC<IFileSelector> = ({ children }) => {
    return <Chiplet.Dialog onClose={() => {}}></Chiplet.Dialog>;
};

export default FileSelector;
