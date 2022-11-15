import YourDashIcon from '../icon/iconDictionary';
import styles from './CardButton.module.css';
import Icon from "./../icon/Icon"

export interface ICardButton {
  children: React.ReactChild | React.ReactChild[];
  onClick: () => void;
  icon?: YourDashIcon;
}

const CardButton: React.FC<ICardButton> = ({ children, onClick, icon }) => {
  return <div className={`${styles.component} ${!icon ? styles.no_image : ""}`} onClick={onClick}>
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
