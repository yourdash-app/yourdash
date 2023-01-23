import styles from './ProgressBar.module.scss';

export interface IProgressBar {
  value: number
  displayPercentage?: boolean
}

const ProgressBar: React.FC<IProgressBar> = ({
  value, displayPercentage 
}) => {
  return <div className={styles.component}>
    <div className={styles.progress} style={{
      width: value > 0 ? `${value}%` : "100%",
      ...value > 0 ? { backgroundColor: "var(--progress-bar-fg)" } : {},
      position: value > 11 ? "relative" : "unset"
    }}>
      {
        displayPercentage
          ? <span className={styles.percentage} style={
            value > 11 ? { color: "var(--progress-bar-bg)" } : {}
          }>{value}%</span>
          : null
      }
    </div>
  </div >;
};

export default ProgressBar;