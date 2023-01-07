import { useEffect, useState } from 'react';
import ColContainer from '../../../components/containers/ColContainer/ColContainer';
import RowContainer from '../../../components/containers/RowContainer/RowContainer';
import CardButton from '../../../components/elements/cardButton/CardButton';
import Icon from '../../../components/elements/icon/Icon';
import AppLayout from '../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../page';
import TasksLayout from './components/TasksLayout';
import styles from "./index.module.scss"
import SERVER, { verifyAndReturnJson } from '../../../lib/server';
import IconButton from '../../../components/elements/iconButton/IconButton';

const TasksIndex: NextPageWithLayout = () => {
  const [ personalLists, setPersonalLists ] = useState([] as string[])

  useEffect(() => {
    verifyAndReturnJson(
      SERVER.get(`/tasks/personal/lists`),
      (data) => {
        setPersonalLists(data.lists || [])
      },
      () => {
        console.error(`unable to fetch the user's personal lists`)
      }
    )
  }, [])

  return (
    <ColContainer>
      <RowContainer className={styles.title}>
        <Icon name='yourdash-logo' useDefaultColor />
        <h1>Tasks</h1>
      </RowContainer>
      <section className={styles.section}>
        <section className={styles.sectionHeader}>
          <h3>Personal lists</h3>
          <IconButton onClick={() => {
            verifyAndReturnJson(
              SERVER.post("/tasks/list/create", { body: "" }),
              (data) => {
                console.log(data)
              },
              () => {
                console.error("unable to create a new list")
              }
            )
          }} icon="plus-16" />
        </section>
        <ColContainer>
          {
            personalLists.map((list, ind) => {
              return <CardButton key={ind} onClick={() => {
                console.log(`Implement Me!!!`)
              }}>
                <span>{list}</span>
                <IconButton onClick={() => {
                  console.log(`Implement Me!!!`)
                }} icon="pencil-16" />
                <IconButton onClick={() => {
                  console.log(`Implement Me!!!`)
                }} icon="trash-16" />
              </CardButton>
            })
          }
        </ColContainer>
      </section>
      {/* <section className={styles.section}>
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
      </section> */}
    </ColContainer>
  );
};

export default TasksIndex;

TasksIndex.getLayout = (page) => {
  return <AppLayout>
    <TasksLayout>
      {page}
    </TasksLayout>
  </AppLayout>
}