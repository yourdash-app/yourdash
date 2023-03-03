import { type filesFile } from "./file.js";

interface filesDirectory {
    name: string;
    path: string;
    items: (filesDirectory | filesFile)[];
    type: "directory";
}

export { type filesDirectory };
