import styles from './CardButton.module.scss';

export interface ICardButton extends React.ComponentPropsWithoutRef<"div"> {
  onClick: () => void;
  className?: string;
  tabIndex?: number;
}

const CardButton: React.FC<ICardButton> = ({
  children, onClick, className, tabIndex, ...extraProps
}) => {
  return <div {...extraProps} tabIndex={0 || tabIndex} className={`${styles.component} ${className}`} onClick={onClick}>
    {children}
  </div>;
};

export default CardButton;
