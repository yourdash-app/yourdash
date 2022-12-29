import styles from './CardButton.module.scss';

export interface ICardButton {
  children: React.ReactChild | React.ReactChild[];
  onClick: () => void;
  className?: string
}

const CardButton: React.FC<ICardButton> = ({
  children, onClick, className 
}) => {
  return <div className={`${styles.component} ${className}`} onClick={onClick}>
    {children}
  </div>;
};

export default CardButton;
