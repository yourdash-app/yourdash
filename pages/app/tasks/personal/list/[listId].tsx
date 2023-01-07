import { useEffect, useState } from 'react';
import ColContainer from '../../../../../components/containers/ColContainer/ColContainer';
import RowContainer from '../../../../../components/containers/RowContainer/RowContainer';
import CardButton from '../../../../../components/elements/cardButton/CardButton';
import AppLayout from '../../../../../components/layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import TasksLayout from './../../components/TasksLayout';
import SERVER, { verifyAndReturnJson } from '../../../../../lib/server';
import { useRouter } from 'next/router';
import TasksList from '../../../../../types/tasks/list';
import IconButton from '../../../../../components/elements/iconButton/IconButton';
import styles from "./listId.module.scss"
import Card from '../../../../../components/containers/card/Card';
import TextInput from '../../../../../components/elements/textInput/TextInput';
import Button from '../../../../../components/elements/button/Button';
import TextBox from '../../../../../components/elements/textBox/TextBox';

function loadList(listId: string, setList: (_value: TasksList) => void) {
  verifyAndReturnJson(
    SERVER.get(`/tasks/personal/list/${listId}`),
    (data) => {
      setList(data)
    }, 
    () => {
      console.error(`unable to fetch tasks`)
    }
  )
}

const TasksPersonalList: NextPageWithLayout = () => {
  const router = useRouter()

  const [ selectedTask, setSelectedTask ] = useState(null as null | number)
  const [ listData, setListData ] = useState(null as TasksList | null)
  const [ showListSettings, setShowListSettings ] = useState(false)
  const [ unsavedListData, setUnsavedListData ] = useState(null as TasksList | null)

  useEffect(() => {
    if (!router.query.listId) return

    if (typeof router.query.listId === "string") {
      loadList(router.query.listId, (list) => {
        setListData(list)
        setUnsavedListData(list)
      })
    } else {
      router.push(`/app/tasks`)
    }
  }, [ router ])

  if (!listData) return <></>
  if (!unsavedListData) return <></>

  return (
    <div className={styles.root}>
      {
        showListSettings
          ? <>
            <div
              className={styles.listSettingsBackdrop}
              onClick={() => {
                setShowListSettings(false)
              }}
            ></div>
            <Card className={styles.listSettings}>
              <RowContainer className={styles.header}>
                <h2>Manage list settings</h2>
                <IconButton icon="x-16" onClick={() => {
                  setShowListSettings(false)
                }} />
              </RowContainer>
              <main className={styles.main}>
                <p>
                  Title
                </p>
                <TextInput
                  defaultValue={unsavedListData.name}
                  placeholder='Untitled'
                  onChange={(e) => {
                    if (!unsavedListData) return

                    setUnsavedListData({
                      description: unsavedListData.description,
                      id: unsavedListData.id,
                      name: e.currentTarget.value,
                      tasks: unsavedListData.tasks,
                    })
                  }}
                />
                <p>
                  Description
                </p>
                <TextBox
                  style={{
                    resize: "vertical", 
                    transition: "none" 
                  }}
                  defaultValue={unsavedListData.description}
                  onChange={(e) => {
                    if (!unsavedListData) return

                    setUnsavedListData({
                      description: e.currentTarget.value,
                      id: unsavedListData.id,
                      name: unsavedListData.name,
                      tasks: unsavedListData.tasks 
                    })
                  }}
                />
              </main>
              <Button onClick={() => {
                verifyAndReturnJson(
                  SERVER.post(`/tasks/personal/list/${router.query.listId}`, { body: JSON.stringify(unsavedListData) }),
                  () => {
                    setListData(unsavedListData)
                  },
                  () => {
                    console.error(`unable to save list data`)
                  }
                )
                setShowListSettings(false)
              }} vibrant>
                Save and close
              </Button>
            </Card>
          </>
          : null
      }
      <ColContainer>
        <RowContainer className={styles.header}>
          <IconButton
            icon='chevron-left-16'
            onClick={() => {
              router.push(`/app/tasks`)
            }}
          />
          <h1>{listData.name}</h1>
          <IconButton
            icon='plus-16'
            onClick={() => {
              console.log(`Implement Me!!! this should add a new task`)
            }}
          />
          <IconButton
            icon='gear-16'
            onClick={() => {
              setShowListSettings(true)
            }}
          />
        </RowContainer>
        <main className={styles.tasksView}>
          {
            listData.tasks.length !== 0 ?
              listData.tasks.map((task, ind) => {
                return <CardButton
                  key={ind}
                  onClick={() => {
                    setSelectedTask(ind)
                  }}>
                  <span>{task.title}</span>
                </CardButton>
              })
              : null
          }
        </main>
      </ColContainer>
    </div>
  );
};

export default TasksPersonalList;

TasksPersonalList.getLayout = (page) => {
  return <AppLayout>
    <TasksLayout>
      {page}
    </TasksLayout>
  </AppLayout>
}