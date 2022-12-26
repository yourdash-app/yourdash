import { useState } from 'react';
import Card from '../../containers/card/Card';
import Button from '../button/Button';
import styles from './SideBar.module.scss';
import Icon from '../icon/Icon';

interface IButton {
  title: string,
  onClick: () => void
}

export interface ISideBar extends React.ComponentPropsWithoutRef<"div"> {
  title: string,
  sections: {
    title: string,
    buttons: IButton[];
  }[]
}

const SideBar: React.FC<ISideBar> = ({ title, sections, ...extraProps }) => {

  const [ toggledSections, setToggledSections ] = useState([] as string[])

  return <div className={styles.component} {...extraProps}>
    {
      title
        ? <h2>{title}</h2>
        : null
    }
    {
      sections.map((section, ind) => {
        return <Card className={styles.card} key={ind} data-toggled={toggledSections.indexOf(section.title) !== -1}>
          <>
            <section onClick={() => {
              if (toggledSections.indexOf(section.title) === -1) {
                setToggledSections([ ...toggledSections, section.title ])
              } else {
                setToggledSections([ ...toggledSections.filter((sect) => sect !== section.title) ])
              }
            }}>
              {
                section.title ? <h3>{section.title}</h3> : null
              }
              <Icon data-toggled={toggledSections.indexOf(section.title) !== -1} name='chevron-up-16' color="var(--card-fg)" />
            </section>
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