import { useState } from 'react';
import styles from './DropdownButton.module.scss';

export interface IDropdownButton extends React.ComponentPropsWithoutRef<"div"> {
  children: string;
  items: {
    name: string,
    shortcut?: string,
    onClick: () => void
  }[];
  className?: string;
}

const DropdownButton: React.FC<IDropdownButton> = ({
  children, items, className, ...extraProps
}) => {
  const [ selectedOption, setSelectedOption ] = useState("")
  const [ dropdownShown, setDropdownShown ] = useState(false)

  return <div
    {...extraProps}
    className={`${styles.componentRoot} ${className}`}
    style={{ height: "max-content", }}>
    DROP DOWN BUTTON
  </div>
};

export default DropdownButton;
