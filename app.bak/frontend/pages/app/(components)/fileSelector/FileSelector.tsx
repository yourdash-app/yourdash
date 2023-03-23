import React, { useState } from "react";
import Chiplet from "~/chipletui";

enum YourDashFileTypes {
    Text
}

export interface IFileSelector {
    allowedFileTypes: YourDashFileTypes[];
    singleFile: boolean;
    visible: boolean;
    onClose: () => void;
}

const FileSelector: React.FC<IFileSelector> = ({ allowedFileTypes, singleFile, visible, onClose }) => {
    const [selectedFiles, setSelectedFiles] = useState([] as string[]);

    return <Chiplet.Dialog visible={visible} onClose={onClose}>
        <>
          text
        </>
    </Chiplet.Dialog>;
};

export default FileSelector;
