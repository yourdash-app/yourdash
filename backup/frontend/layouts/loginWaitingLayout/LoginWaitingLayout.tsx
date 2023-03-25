import styles from "./LoginWaitingLayout.module.css"
import React from "react";

interface ILoginWaitingLayout {
  children: React.ReactNode
}

const LoginWaitingLayout: React.FC<ILoginWaitingLayout> = ({ children }) => {
  return (
    <div className={ styles.root }>
      {children}
    </div>
)
};

export default LoginWaitingLayout;
