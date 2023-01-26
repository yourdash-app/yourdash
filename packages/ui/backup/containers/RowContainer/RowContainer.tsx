import styles from './RowContainer.module.css';

export interface IRowContainer extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const RowContainer: React.FC<IRowContainer> = ({
  children, className, ...extraProps
}) => {
  return <div {...extraProps} className={`${styles.component} ${className}`}>{children}</div>;
};

export default RowContainer;
