import FilesSideBar from "./FilesSideBar";
import styles from "./FilesLayout.module.scss"

export interface IFilesLayout extends React.ComponentPropsWithoutRef<'div'> { }

const FilesLayout: React.FC<IFilesLayout> = ({ children }) => {
  return <div className={styles.root}>
    <FilesSideBar currentDir="/" />
    <div className={styles.content}>
      {children}
    </div>
  </div>
};

export default FilesLayout;
