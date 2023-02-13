import styles from './Spinner.module.scss';
import {CSSProperties} from "react";

export interface ISpinner {
  style?: CSSProperties
}

const Spinner: React.FC<ISpinner> = ({children, style}) => {
  return <div className={ styles.component } style={ style }>{children}</div>;
};

export default Spinner;
