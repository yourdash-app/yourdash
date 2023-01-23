import NavigationBar from "./navigationBar/NavigationBar"
import Footer from "./footer/Footer"
import styles from "./HomeLayout.module.css"

const HomeLayout: React.FC = ({ children }) => (
  <>
    <NavigationBar/>
    <div className={styles.root}>
      {children}
      <Footer/>
    </div>
  </>
);

export default HomeLayout;