import React, { CSSProperties } from "react";
import styles from "./Dialog.module.scss"
import IconButton from "../iconButton/IconButton";

export interface IDialog {
  onClose?: () => void;
  className?: string;
  visible: boolean
  style?: CSSProperties;
}

const Dialog: React.FC<IDialog> = ({ children, onClose, className, visible, style }) => {
  return (
    <div className={ `${styles.component} ${className} ${!visible && styles.hidden}` } style={ style }>
      <section className={ styles.handle }>
        <div/>
      </section>
      <IconButton className={ styles.closeButton } data-visible={ !!onClose } icon={ "x-16" } onClick={ onClose }/>
      <section className={ styles.content }>
        {children}
      </section>
    </div>
  )
}

export default Dialog
