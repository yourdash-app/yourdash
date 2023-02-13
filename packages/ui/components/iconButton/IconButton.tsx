import { COLOR } from 'types/global/color';
import Icon from '../icon/Icon';
import { type ChipletIcon } from '../icon/iconDictionary';
import styles from './IconButton.module.scss';

export interface IIconButton extends React.ComponentPropsWithoutRef<"button"> {
  icon: ChipletIcon;
  vibrant?: boolean;
  disabled?: boolean;
  useDefaultColor?: boolean;
  color?: COLOR;
  className?: string
}

const IconButton: React.FC<IIconButton> = ({
                                             icon, vibrant, disabled, useDefaultColor, color, className, ...extraProps
                                           }) => {
  return (
    <button
      type={ "button" }
      { ...extraProps }
      disabled={ disabled }
      className={ `${styles.component} ${vibrant ? styles.vibrant : ""} ${className}` }
    >
      <Icon useDefaultColor={ useDefaultColor } color={ color || `var(--button-fg)` } name={ icon }/>
    </button>
  )
};

export default IconButton;
