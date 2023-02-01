import styles from './Card.module.scss';
import { CSSProperties } from "react";

export interface ICard {
    compact?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    style?: CSSProperties
    className?: string
}

const Card: React.FC<ICard> = ({
                                   children, compact, onClick, style, className
                               }) => {
    return (
        onClick ? (
          <button
            style={ style }
            type="button"
            onClick={ onClick }
            className={ `${styles.component} ${compact && styles.compact} ${styles.clickable} ${className}` }
          >{children}</button>
        ) : (
          <div
            style={ style }
            className={ `${styles.component} ${compact && styles.compact} ${className}` }
          >{children}</div>
        )
    )
};

export default Card;
