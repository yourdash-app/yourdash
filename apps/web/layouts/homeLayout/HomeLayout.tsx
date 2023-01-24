import NavigationBar from "./navigationBar/NavigationBar"
import Footer from "./footer/Footer"
import styles from "./HomeLayout.module.css"

interface IHomeLayout {
  noFooter?: boolean
}

const HomeLayout: React.FC<IHomeLayout> = ({ children, noFooter }) => (
  <>
    <NavigationBar/>
    <div className={styles.root}>
      {children}
      {
              !noFooter ?? <Footer/>
          }
    </div>
  </>
  );

export default HomeLayout;