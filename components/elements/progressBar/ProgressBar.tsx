import styles from './ProgressBar.module.scss';

export interface IProgressBar {
  value: number
  displayPercentage?: boolean
}

const ProgressBar: React.FC<IProgressBar> = ({ value, displayPercentage }) => {
  return <div className={styles.component}>
    <div className={styles.progress} style={{
      width: `${value}%`
    }}>
      {
        displayPercentage ? <span className={styles.percentage}>{value}%</span> : null
      }
    </div>
  </div>;
};

export default ProgressBar;