import CardButton from "ui/backup/elements/cardButton/CardButton";
import DropdownMenu from "ui/backup/elements/dropdownMenu/DropdownMenu";
import Icon from "ui/icon/Icon";
import IconButton from "ui/backup/elements/iconButton/IconButton";
import styles from "./File.module.scss"

export interface IFile {
  name: string,
  path: string,
  type: "file" | "folder",
}

const File: React.FC<IFile> = ({
                                 name, path, type
                               }) => (
                                 <CardButton
                                   onClick={() => {
          console.log(`Implement Me!!!`)
        }}
                                   className={styles.component}
                                 >
                                   <Icon color={"var(--card-fg)"} name={type === "file" ? "file-16" : "file-directory-16"}/>
                                   <span>{name}</span>
                                   <span>{path}</span>
                                   <span>{type}</span>
                                   <DropdownMenu items={[
        {
          name: "Delete",
          onClick: () => {
            console.log(`Implement Me!!!`)
          }
        }
      ]}
                                   >
                                     <IconButton
                                       onClick={() => {
              console.log(`Implement Me!!!`)
            }}
                                       icon="three-bars-16"
                                     />
                                   </DropdownMenu>
                                 </CardButton>
);

export default File;
