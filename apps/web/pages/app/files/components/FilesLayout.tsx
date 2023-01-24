import FilesSideBar from "./FilesSideBar";
import styles from "./FilesLayout.module.scss"
import ColContainer from "../../../../components/containers/ColContainer/ColContainer";

const FilesLayout: React.FC = ({ children }) => {
  return <div className={styles.root}>
    <FilesSideBar currentDir="/" />
    <ColContainer className={styles.pane}>
      {children}
    </ColContainer>
  </div>
};

export default FilesLayout;
