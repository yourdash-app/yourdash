import FilesSideBar from "./FilesSideBar";
import styles from "./FilesLayout.module.scss"
import ColContainer from "../../../../components/containers/ColContainer/ColContainer";

export interface IFilesLayout extends React.ComponentPropsWithoutRef<'div'> { }

const FilesLayout: React.FC<IFilesLayout> = ({ children }) => {
  return <div className={styles.root}>
    <FilesSideBar currentDir="/" />
    <ColContainer className={styles.pane}>
      {children}
    </ColContainer>
  </div>
};

export default FilesLayout;
