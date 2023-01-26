import styles from './CenteredContainer.module.css';

export interface ICenteredContainer extends React.ComponentPropsWithoutRef<"div"> {
  className?: string
}

const CenteredContainer: React.FC<ICenteredContainer> = ({
  children, className, ...extraProps 
}) => {
  return <div {...extraProps} className={`${styles.component} ${className}`}>{children}</div>;
};

export default CenteredContainer;
