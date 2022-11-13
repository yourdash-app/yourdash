import FloatingLabel from '../floatingLabel/FloatingLabel';
import styles from './ValidatedTextInput.module.css';

export interface IValidatedTextInput extends React.ComponentPropsWithoutRef<'input'> {
  isValid?: boolean;
  invalidReason?: string;
  defaultValue?: string;
}

const ValidatedTextInput: React.FC<IValidatedTextInput> = ({ children, isValid, defaultValue, invalidReason, ...inputProps }) => {
  return <div className={styles.component}>
    <input {...inputProps} type="text" defaultValue={defaultValue ? defaultValue : ""} className={`${styles.input} ${isValid ? styles.valid : styles.invalid}`}>{children}</input>
    <div className={styles.labelContainer}>
      <FloatingLabel>
        {invalidReason || ""}
      </FloatingLabel>
    </div>
  </div>
}

export default ValidatedTextInput;
