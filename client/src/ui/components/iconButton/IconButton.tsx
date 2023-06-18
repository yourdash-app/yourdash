import React from 'react';

import Icon from '../icon/Icon';
import {type ChipletIcon} from '../icon/iconDictionary';

import styles from './IconButton.module.scss';

export interface IIconButton extends React.ComponentPropsWithoutRef<'button'> {
  icon: ChipletIcon;
  vibrant?: boolean;
  disabled?: boolean;
  useDefaultColor?: boolean;
  className?: string
}

const IconButton: React.FC<IIconButton> = ({
  icon, vibrant, disabled, useDefaultColor, className, ...extraProps
}) => (
  <button
    type={'button'}
    {...extraProps}
    disabled={disabled}
    className={`${ styles.component } ${ vibrant && styles.vibrant } ${ className && className }`}
  >
    <Icon useDefaultColor={useDefaultColor} color={'currentColor'} name={icon}/>
  </button>
);

export default IconButton;
