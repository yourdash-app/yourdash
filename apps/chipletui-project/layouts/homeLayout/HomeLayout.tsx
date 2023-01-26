import NavigationBar from "./navigationBar/NavigationBar"
import Footer from "./footer/Footer"
import styles from "./HomeLayout.module.css"
import React from "react";
import RootIntergration from "ui/RootIntergration";

interface IHomeLayout {
  noFooter?: boolean
  children: React.ReactNode
}

const HomeLayout: React.FC<IHomeLayout> = ({ children, noFooter }) => (
  <>
    <RootIntergration />
    <NavigationBar/>
    <div className={styles.root}>
      {children}
      {
            !noFooter && <Footer/>
        }
    </div>
  </>
);

export default HomeLayout;