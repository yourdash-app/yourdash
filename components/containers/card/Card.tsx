import styles from './Card.module.css';

export interface ICard extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactChild | React.ReactChild[];
  compact?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<ICard> = ({ children, compact, className, style, ...extraProps }) => {
  return <div style={style} {...extraProps} className={`${styles.component} ${compact ? styles.compact : ""} ${className}`}>{children}</div>;
};

export default Card;
