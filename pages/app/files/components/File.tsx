import CardButton from "../../../../components/elements/cardButton/CardButton";
import DropdownMenu from "../../../../components/elements/dropdownMenu/DropdownMenu";
import Icon from "../../../../components/elements/icon/Icon";
import IconButton from "../../../../components/elements/iconButton/IconButton";
import styles from "./File.module.scss"

export interface IFile {
  name: string,
  path: string,
  type: "file" | "folder",
}

const File: React.FC<IFile> = ({
  name, path, type 
}) => {
  return <CardButton onClick={() => {}} className={styles.component}>
    <Icon color={"var(--card-fg)"} name={type === "file" ? "file-16" : "file-directory-16"} />
    <span>{name}</span>
    <span>{path}</span>
    <span>{type}</span>
    <DropdownMenu items={[
      {
        name: "Delete",
        onClick: () => {}
      }
    ]}>
      <IconButton onClick={() => {}} icon="three-bars-16"></IconButton>
    </DropdownMenu>
  </CardButton>
};

export default File;
