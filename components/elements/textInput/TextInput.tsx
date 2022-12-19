import styles from './TextInput.module.css';

export interface ITextInput extends React.ComponentPropsWithoutRef<'input'> {
  defaultValue?: string;
  className?: string;
}

const TextInput: React.FC<ITextInput> = ({ children, defaultValue, className, ...inputProps }) => {
  return <input {...inputProps} type={inputProps.type ? inputProps.type : "text"} defaultValue={defaultValue ? defaultValue : ""} className={`${styles.input} ${className}`}>{children}</input>
}

export default TextInput;
