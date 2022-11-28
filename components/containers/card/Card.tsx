import styles from './Card.module.css';

export interface ICard {
  children: React.ReactChild | React.ReactChild[];
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onBlur?: () => void
}

const Card: React.FC<ICard> = ({ children, compact, className, style, onBlur }) => {
  return <div style={style} onBlur={onBlur} className={`${styles.component} ${compact ? styles.compact : ""} ${className}`}>{children}</div>;
};

export default Card;
