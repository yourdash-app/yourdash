import React from "react";
import styles from "./Dialog.module.scss"
import IconButton from "../backup/elements/iconButton/IconButton";

export interface IDialog {
    onClose?: () => void
}

const Dialog: React.FC<IDialog> = ({children, onClose}) => {
    return (
      <div className={ styles.component }>
        <section className={ styles.handle }>
          <div/>
        </section>
        <IconButton className={ styles.closeButton } data-visible={ !!onclose } icon={ "x-16" } onClick={ onClose }/>
        <section className={ styles.content }>
          {children}
        </section>
      </div>
    )
}

export default Dialog
