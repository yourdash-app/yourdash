import styles from './Spinner.module.scss';
import {CSSProperties} from "react";

export interface ISpinner {
  style?: CSSProperties
}

const Spinner: React.FC<ISpinner> = ({style}) => {
  return <div className={ styles.component } style={ style }></div>;
};

export default Spinner;
