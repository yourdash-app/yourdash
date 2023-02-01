import styles from './Card.module.scss';

export interface ICard {
    compact?: boolean;
    onClick?: () => void;
    children: React.ReactNode
}

const Card: React.FC<ICard> = ({
                                   children, compact, onClick
                               }) => {
    return (
        onClick ? (
          <button
            type="button"
            onClick={ onClick }
            className={ `${styles.component} ${compact && styles.compact} ${styles.clickable}` }
          >{children}</button>
        ) : (
          <div
            className={ `${styles.component} ${compact && styles.compact}` }
          >{children}</div>
        )
    )
};

export default Card;
