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
import Tags from '../../../../../components/elements/tags/Tags';
import TasksListItem from '../../../../../types/tasks/listItem';

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
  const [ selectedTaskData, setSelectedTaskData ] = useState(null as null | TasksListItem)
  const [ listData, setListData ] = useState(null as TasksList | null)
  const [ showListSettings, setShowListSettings ] = useState(false)
  const [ unsavedListData, setUnsavedListData ] = useState(null as TasksList | null)
  const [ pageChanging, setPageChanging ] = useState(false)

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

  useEffect(() => {
    if (selectedTask === null) return

    verifyAndReturnJson(
      SERVER.get(`/tasks/personal/list/${router.query.listId}/task/${selectedTask}`),
      (data) => {
        setSelectedTaskData(data)
      },
      () => {
        console.error(`unable to fetch task data`)
      }
    )
  }, [ selectedTask ])

  if (!listData) return <></>
  if (!unsavedListData) return <></>

  return (
    <div className={`${styles.root} ${pageChanging && styles.slideOut}`}>
      <div
        className={`${styles.listSettingsBackdrop} ${showListSettings && styles.visible}`}
        onClick={() => {
          setShowListSettings(false)
        }}
      ></div>
      <Card className={`${styles.listSettings} ${showListSettings && styles.visible}`}>
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
                tags: unsavedListData.tags
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
                tasks: unsavedListData.tasks,
                tags: unsavedListData.tags
              })
            }}
          />
          <p>
            Tags
          </p>
          <Tags tags={unsavedListData.tags} />
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
      <ColContainer>
        <RowContainer className={styles.header}>
          <IconButton
            icon='chevron-left-16'
            onClick={() => {
              router.prefetch(`/app/tasks`)
              setPageChanging(true)
              setTimeout(() => {
                router.push(`/app/tasks`)
              }, 500)
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
                  className={styles.tasksViewTask}
                  onClick={() => {
                    setSelectedTask(ind)
                  }}>
                  <RowContainer>
                    <span>{task.title}</span>
                    <IconButton onClick={() => {
                      console.log(`Implement Me!!!`)
                    }} icon={'pencil-16'} />
                    <IconButton onClick={() => {
                      console.log(`Implement Me!!!`)
                    }} icon={'trash-16'} />
                  </RowContainer>
                </CardButton>
              })
              : null
          }
        </main>
      </ColContainer>
      <section className={`${styles.taskProperties} ${selectedTask !== null && styles.taskPropertiesOpen}`}>
        <ColContainer>
          <RowContainer>
            <TextInput style={{ flex: 1 }} defaultValue={selectedTaskData?.title} />
            <IconButton style={{ aspectRatio: "1 / 1" }} icon='x-16' onClick={() => {
              setSelectedTask(null)
            }} />
          </RowContainer>
          <TextBox style={{
            flexDirection: 'row',
            flex: 1
          }} defaultValue={selectedTaskData?.description}></TextBox>
          <Button>Apply</Button>
        </ColContainer>
      </section>
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