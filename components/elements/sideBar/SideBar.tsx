import Button from '../button/Button';
import styles from './SideBar.module.scss';

interface IButton {
  title: string,
  icon?: string,
  onClick: () => void
}

export interface ISideBar {
  title: string,
  sections: {
    title: string,
    buttons: IButton[];
  }[]
}

const SideBar: React.FC<ISideBar> = ({ title, sections }) => {
  return <div className={styles.component}>
    <h2>{title}</h2>
    {
      sections.map((section) => {
        return <>
          {
            section.title ? <h3>{section.title}</h3> : null}
          {
            section.buttons.map((button, ind) => {
              return <Button onClick={() => button.onClick} key={ind}>{button.title}</Button>
            })
          }
        </>
      })
    }
  </div>;
};

export default SideBar;