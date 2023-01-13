import COLOR from '../../../lib/color';
import CSSVariable from '../../../lib/cssVariable';
import Icon from '../icon/Icon';
import YourDashIcon from '../icon/iconDictionary';
import styles from './IconButton.module.scss';

export interface IIconButton extends React.ComponentPropsWithoutRef<"button"> {
  icon: YourDashIcon;
  vibrant?: boolean;
  disabled?: boolean;
  useDefaultColor?: boolean;
  color?: COLOR | CSSVariable;
}

const IconButton: React.FC<IIconButton> = ({
  icon, vibrant, disabled, useDefaultColor, color, ...extraProps
}) => {
  return <button
    {...extraProps}
    disabled={disabled}
    className={`${styles.component} ${vibrant ? styles.vibrant : ""}`}>
    <Icon useDefaultColor={useDefaultColor} color={color || `var(--button-fg)`} name={icon}></Icon>
  </button>;
};

export default IconButton;
