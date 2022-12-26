import YourDashIcon from '../icon/iconDictionary';
import styles from './CardButton.module.scss';
import Icon from "./../icon/Icon"

export interface ICardButton {
  children: React.ReactChild | React.ReactChild[];
  onClick: () => void;
  icon?: YourDashIcon;
  className?: string
}

const CardButton: React.FC<ICardButton> = ({ children, onClick, icon, className }) => {
  return <div className={`${styles.component} ${!icon ? styles.no_image : ""} ${className}`} onClick={onClick}>
    {icon ? <Icon name={icon} color="var(--card-fg)" style={{
      width: "2.5rem",
      height: "2.5rem"
    }} /> : null}
    <section>
      {children}
    </section>
  </div>;
};

export default CardButton;
