import FilesSideBar from "./FilesSideBar";
import styles from "./FilesLayout.module.scss"
import ColContainer from "ui/containers/ColContainer/ColContainer";

const FilesLayout: React.FC = ({ children }) => (
  <div className={styles.root}>
    <FilesSideBar currentDir="/"/>
    <ColContainer className={styles.pane}>
      {children}
    </ColContainer>
  </div>
);

export default FilesLayout;
