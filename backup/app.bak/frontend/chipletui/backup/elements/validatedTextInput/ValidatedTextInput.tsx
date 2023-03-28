import styles from './ValidatedTextInput.module.scss';

export interface IValidatedTextInput extends React.ComponentPropsWithoutRef<'input'> {
  invalidReason?: string;
  defaultValue?: string;
}

const ValidatedTextInput: React.FC<IValidatedTextInput> = ({
                                                             defaultValue, invalidReason, ...inputProps
                                                           }) => {
  return (
    <div className={ styles.component }>
      <input
        { ...inputProps }
        type="text"
        defaultValue={ defaultValue ? defaultValue : "" }
        className={ `${styles.input} ${invalidReason ? styles.invalid : styles.valid}` }
      />
      <div className={ styles.labelContainer } data-reason={ invalidReason }>
        {invalidReason || ""}
      </div>
    </div>
  )
}

export default ValidatedTextInput;
