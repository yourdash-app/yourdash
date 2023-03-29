import React from "react";
import styles from './MajorButton.module.scss';

export interface IMajorButton extends React.ComponentPropsWithoutRef<"button"> {
  className?: string;
}

const MajorButton: React.FC<IMajorButton> = ({ children, className, ...extraProps }) => {
  return <button
      type="button"
      { ...extraProps }
      className={ `${ styles.component } ${ className }` }
  >
    { children }
  </button>
};

export default MajorButton;
