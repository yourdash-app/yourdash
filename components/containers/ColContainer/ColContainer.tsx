import styles from './ColContainer.module.css';

export interface IColContainer extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

const ColContainer: React.FC<IColContainer> = ({ children, className, ...extraProps }) => {
  return <div {...extraProps} className={`${styles.component} ${className}`}>{children}</div>;
};

export default ColContainer;
