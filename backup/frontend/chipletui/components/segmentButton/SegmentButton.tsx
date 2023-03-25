import styles from './SegmentButton.module.scss';

export interface ISegmentButton {
  buttons: {
    label: string,
    onClick: () => void
  }[]
}

const SegmentButton: React.FC<ISegmentButton> = ({
                                                   buttons
                                                 }) => {
  return (
    <div className={ styles.component }>
      {
          buttons.map(button => {
            return <button key={ button.label } onClick={ button.onClick } className={ styles.button }>{button.label}</button>
          })
        }
    </div>
  )
};

export default SegmentButton; 
