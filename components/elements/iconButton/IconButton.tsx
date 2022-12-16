import COLOR from '../../../lib/color';
import Icon from '../icon/Icon';
import YourDashIcon from '../icon/iconDictionary';
import styles from './IconButton.module.scss';

export interface IIconButton {
  icon: YourDashIcon;
  vibrant?: boolean;
  onClick: () => void;
  disabled?: boolean;
  useDefaultColor?: boolean;
  color?: COLOR;
}

const IconButton: React.FC<IIconButton> = ({ icon, vibrant, onClick, disabled, useDefaultColor, color }) => {
  return <button
    onClick={() => {
      if (!disabled) onClick()
    }}
    className={`${styles.component} ${vibrant ? styles.vibrant : ""}`}>
    <Icon useDefaultColor={useDefaultColor} color={color || `var(--button-fg)`} name={icon}></Icon>
  </button>;
};

export default IconButton;
