import ColContainer from '../../../components/containers/ColContainer/ColContainer';
import RowContainer from '../../../components/containers/RowContainer/RowContainer';
import CardButton from '../../../components/elements/cardButton/CardButton';
import Icon from '../../../components/elements/icon/Icon';
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import styles from "./index.module.scss"

const TasksIndex: NextPageWithLayout = () => {
  return (
    <ColContainer>
      <RowContainer className={styles.title}>
        <Icon name='yourdash-logo' useDefaultColor />
        <h1>Tasks</h1>
      </RowContainer>
      <section className={styles.section}>
        <h3>Personal lists</h3>
        <CardButton onClick={() => {
          console.log(`Implement Me!!!`)
        }}>
          <RowContainer>
            <span>Name</span>
          </RowContainer>
        </CardButton>
      </section>
      <section className={styles.section}>
        <h3>Organizations</h3>
        <ColContainer>
          {
            [
              {
                icon: "", 
                name: "test",
              },
              {
                icon: "", 
                name: "test",
              },
              {
                icon: "", 
                name: "test",
              },
              {
                icon: "", 
                name: "test",
              }
            ].map((org, ind) => {
              return <CardButton key={ind} onClick={() => {
                console.log(`Implement Me!!!`)
              }}>
                <RowContainer>
                  <img src={org.icon} alt="" />
                  <span>{org.name}</span>
                </RowContainer>
              </CardButton>
            })
          }
        </ColContainer>
      </section>
    </ColContainer>
  );
};

export default TasksIndex;

TasksIndex.getLayout = (page) => {
  return <AppLayout>
    {page}
  </AppLayout>
}