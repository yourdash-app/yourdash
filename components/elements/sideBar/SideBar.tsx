import { useState } from 'react';
import Card from '../../containers/card/Card';
import Button from '../button/Button';
import styles from './SideBar.module.scss';

interface IButton {
  title: string,
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

  const [ toggledSections, setToggledSections ] = useState([] as string[])

  return <div className={styles.component}>
    <h2>{title}</h2>
    {
      sections.map((section, ind) => {
        return <Card className={styles.card} key={ind} data-toggled={toggledSections.indexOf(section.title) !== -1} onClick={() => {
          console.log(toggledSections)
          console.log(section.title)
          if (toggledSections.indexOf(section.title) === -1) {
            console.log(1)
            setToggledSections([ ...toggledSections, section.title ])
          } else {
            console.log(2)
            setToggledSections([ ...toggledSections.filter((sect) => sect !== section.title) ])
          }
        }}>
          <>
            {
              section.title ? <h3>{section.title}</h3> : null}
            {
              toggledSections.indexOf(section.title) !== -1 ?
                section.buttons.map((button, ind) => {
                  return <Button onClick={() => button.onClick} key={ind}>{button.title}</Button>
                })
                : null
            }
          </>
        </Card>
      })
    }
  </div>;
};

export default SideBar;