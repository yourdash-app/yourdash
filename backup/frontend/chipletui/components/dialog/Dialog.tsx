import React, { CSSProperties, useState } from "react";
import styles from "./Dialog.module.scss";
import IconButton from "../iconButton/IconButton";

export interface IDialog {
    onClose: () => void;
    className?: string;
    visible: boolean;
    style?: CSSProperties;
    title?: string;
    children: React.ReactNode
}

const Dialog: React.FC<IDialog> = ({ children, onClose, className, visible, style, title }) => {
    const [initialDragPosition, setInitialDragPosition] = useState(0);

    return (
        <div
            className={`${styles.background} ${!visible && styles.hidden}`}
            onClick={onClose}
            onMouseUp={(e) => {
                if (e.screenY > initialDragPosition) {
                    onClose();
                }
            }}
        >
            <div
                className={`${styles.component} ${!visible && styles.hidden}`}
                style={style}
                onMouseUp={(e) => {
                    e.stopPropagation();
                }}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <section
                    className={styles.handle}
                    onMouseDown={(e) => {
                        setInitialDragPosition(e.screenY);
                    }}
                    onMouseUp={(e) => {
                        if (e.screenY > initialDragPosition) {
                            onClose();
                        }
                    }}
                >
                    <div />
                </section>
                <IconButton className={styles.closeButton} data-visible={!!onClose} icon={"x-16"} onClick={onClose} />
                <section className={`${styles.content} ${className}`}>
                    <h1 className={`${styles.title} ${(title === "" || title === undefined) && styles.placeholder}`}>
                        {title}
                    </h1>
                    {children}
                </section>
            </div>
        </div>
    );
};

export default Dialog;