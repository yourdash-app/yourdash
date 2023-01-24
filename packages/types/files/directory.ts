import filesFile from "./file";

export default interface filesDirectory {
  name: string,
  path: string,
  items: (filesDirectory | filesFile)[]
  type: "directory"
}