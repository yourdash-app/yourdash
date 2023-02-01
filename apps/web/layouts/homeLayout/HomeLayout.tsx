import NavigationBar from "./navigationBar/NavigationBar"
import Footer from "./footer/Footer"
import styles from "./HomeLayout.module.css"
import React from "react";

interface IHomeLayout {
  noFooter?: boolean;
  children: React.ReactNode
}

const HomeLayout: React.FC<IHomeLayout> = ({ children, noFooter }) => {
  return (
    <>
      <NavigationBar/>
      <div className={ styles.root }>
        {children}
        {
              !noFooter ?? <Footer/>
          }
      </div>
    </>
)
};

export default HomeLayout;