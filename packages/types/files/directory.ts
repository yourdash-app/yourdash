// eslint-disable-next-line import/no-unresolved
import { type filesFile } from "./file";

interface filesDirectory {
  name: string,
  path: string,
  items: (filesDirectory | filesFile)[]
  type: "directory"
}

export { type filesDirectory }