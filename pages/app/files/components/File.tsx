import CardButton from "../../../../components/elements/cardButton/CardButton";
import styles from "./File.module.scss"

export interface IFile {
  name: string,
  path: string,
  type: "file" | "folder",
  icon: string | undefined
}

const File: React.FC<IFile> = ({
  name, path, type, icon 
}) => {
  return <CardButton onClick={() => {}} className={styles.component}>
    <img src={icon} alt="" />
    <span>{name}</span>
    <span>{path}</span>
    <span>{type}</span>
  </CardButton>
};

export default File;
