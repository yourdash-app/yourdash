import FloatingLabel from '../floatingLabel/FloatingLabel';
import styles from './ValidatedTextInput.module.scss';

export interface IValidatedTextInput extends React.ComponentPropsWithoutRef<'input'> {
  invalidReason?: string;
  defaultValue?: string;
}

const ValidatedTextInput: React.FC<IValidatedTextInput> = ({
  children, defaultValue, invalidReason, ...inputProps 
}) => {
  return <div className={styles.component}>
    <input {...inputProps} type="text" defaultValue={defaultValue ? defaultValue : ""}  className={`${styles.input} ${invalidReason ? styles.invalid : styles.valid}`}>{children}</input>
    <div className={styles.labelContainer}>
      <FloatingLabel>
        {invalidReason || ""}
      </FloatingLabel>
    </div>
  </div>
}

export default ValidatedTextInput;
