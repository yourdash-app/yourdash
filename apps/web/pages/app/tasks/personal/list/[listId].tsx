import { useEffect, useState } from 'react';
import AppLayout from '../../../../../layouts/appLayout/AppLayout';
import { NextPageWithLayout } from '../../../../page';
import TasksLayout from '../../components/TasksLayout';
import SERVER, { verifyAndReturnJson } from '../../../../../server';
import { useRouter } from 'next/router';
import { type TasksList } from 'types/tasks/list';
import IconButton from 'ui/backup/elements/iconButton/IconButton';
import styles from "./listId.module.scss"
import TextInput from 'ui/backup/elements/textInput/TextInput';
import TextBox from 'ui/backup/elements/textBox/TextBox';
import Tags from 'ui/backup/elements/tags/Tags';
import { type TasksListItem } from 'types/tasks/listItem';
import ListTask from "../../components/ListTask/ListTask";
import Chiplet from "ui";

function loadList(listId: string, setList: (_value: TasksList) => void) {
  verifyAndReturnJson(
      SERVER.get(`/tasks/personal/list/${listId}`),
      data => {
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
      loadList(router.query.listId, list => {
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
        data => {
          setSelectedTaskData(data)
        },
        () => {
          console.error(`unable to fetch task data`)
        }
    )
  }, [ selectedTask, router.query.listId ])

  if (!listData) return <></>
  if (!unsavedListData) return <></>

  return (
    <div className={ `${styles.root} ${pageChanging && styles.slideOut}` }>
      <div
        className={ `${styles.listSettingsBackdrop} ${showListSettings && styles.visible}` }
        onClick={ () => {
              setShowListSettings(false)
            } }
      />
      <Chiplet.Card className={ `${styles.listSettings} ${showListSettings && styles.visible}` }>
        <Chiplet.Row className={ styles.header }>
          <h2>Manage list settings</h2>
          <IconButton
            icon="x-16"
            onClick={ () => {
                  setShowListSettings(false)
                } }
          />
        </Chiplet.Row>
        <main className={ styles.main }>
          <p>
            Title
          </p>
          <TextInput
            defaultValue={ unsavedListData.name }
            placeholder='Untitled'
            onChange={ e => {
                  if (!unsavedListData) return

                  setUnsavedListData({
                    description: unsavedListData.description,
                    id: unsavedListData.id,
                    name: e.currentTarget.value,
                    tags: unsavedListData.tags,
                    tasks: unsavedListData.tasks,
                  })
                } }
          />
          <p>
            Description
          </p>
          <TextBox
            style={ {
                  resize: "vertical",
                  transition: "none"
                } }
            defaultValue={ unsavedListData.description }
            onChange={ e => {
                  if (!unsavedListData) return

                  setUnsavedListData({
                    description: e.currentTarget.value,
                    id: unsavedListData.id,
                    name: unsavedListData.name,
                    tags: unsavedListData.tags,
                    tasks: unsavedListData.tasks,
                  })
                } }
          />
          <p>
            Tags
          </p>
          <Tags tags={ unsavedListData.tags }/>
        </main>
        <Chiplet.Button
          onClick={ () => {
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
              } }
          vibrant
        >
          Save and close
        </Chiplet.Button>
      </Chiplet.Card>
      <Chiplet.Column>
        <Chiplet.Row className={ styles.header }>
          <IconButton
            icon='chevron-left-16'
            onClick={ () => {
                  router.prefetch(`/app/tasks`)
                  setPageChanging(true)
                  setTimeout(() => {
                    router.push(`/app/tasks`)
                  }, 500)
                } }
          />
          <h1>{listData.name}</h1>
          <IconButton
            icon='plus-16'
            onClick={ () => {
                  setSelectedTask(null)
                  verifyAndReturnJson(
                      SERVER.get(`/tasks/personal/list/${listData.id}/create/task`),
                      () => {
                        if (!router.query.listId) return

                        if (typeof router.query.listId === "string") {
                          loadList(router.query.listId, list => {
                            setListData(list)
                            setUnsavedListData(list)
                          })
                        } else {
                          router.push(`/app/tasks`)
                        }
                      },
                      () => {
                        console.error("unable to create task")
                      }
                  )
                } }
          />
          <IconButton
            icon='gear-16'
            onClick={ () => {
                  setShowListSettings(true)
                } }
          />
        </Chiplet.Row>
        <Chiplet.Column className={ styles.tasksView }>
          {
              listData.tasks ?
                  listData.tasks.map((task, ind) => {return <ListTask task={ task }/>})
                  : <h1>No tasks</h1>
            }
        </Chiplet.Column>
      </Chiplet.Column>
      <section className={ `${styles.taskProperties} ${selectedTask !== null && styles.taskPropertiesOpen}` }>
        {
              selectedTaskData && (
              <Chiplet.Column>
                <Chiplet.Row>
                  <TextInput
                    style={ { flex: 1 } }
                    defaultValue={ selectedTaskData?.title }
                    onChange={ e => {
                            setSelectedTaskData({
                              ...selectedTaskData, title: e.currentTarget.value
                            })
                          } }
                  />
                  <IconButton
                    style={ { aspectRatio: "1 / 1" } }
                    icon='x-16'
                    onClick={ () => {
                            setSelectedTask(null)
                          } }
                  />
                </Chiplet.Row>
                <p>Description</p>
                <TextBox
                  style={ {
                          flex: 1,
                          flexDirection: 'row',
                        } }
                  defaultValue={ selectedTaskData?.description }
                  onChange={ e => {
                          setSelectedTaskData({
                            ...selectedTaskData, description: e.currentTarget.value
                          })
                        } }
                />
                <p>Tags</p>
                <Tags compact tags={ selectedTaskData.tags }/>
                <p>Assignees</p>
                {/*
              <Card style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "0.5rem",
                transition: "var(--transition)",
              }}>
                <Assignees assignees={selectedTaskData?.assignees || []} />
                <SegmentButton onClick={() => {
                  verifyAndReturnJson(
                    SERVER.post(`/tasks/personal/list/${listData.id}/task/${selectedTask}/assignees/`, { body: JSON.stringify([ ... selectedTaskData.assignees, "bob" ]) }),
                    () => {
                      console.log(`new user added successfully`)
                    },
                    () => {
                      console.error(`unable to add new assignee`)
                    }
                  )
                }}>Add Assignee</SegmentButton>
              </Card>
            */}
                <Chiplet.Button onClick={ () => {
                      setSelectedTask(null)
                      verifyAndReturnJson(
                          SERVER.post(`/tasks/personal/list/${router.query.listId}/task/${selectedTask}`, { body: JSON.stringify(selectedTaskData) }),
                          () => {
                            if (!router.query.listId) return

                            if (typeof router.query.listId === "string") {
                              loadList(router.query.listId, list => {
                                setListData(list)
                                setUnsavedListData(list)
                              })
                            } else {
                              router.push(`/app/tasks`)
                            }
                          },
                          () => {
                            console.error(`unable to save new task data`)
                          }
                      )
                    } }
                >Apply</Chiplet.Button>
              </Chiplet.Column>
              )
          }
      </section>
    </div>
  );
};

export default TasksPersonalList;

TasksPersonalList.getLayout = page => {return (
  <AppLayout>
    <TasksLayout>
      {page}
    </TasksLayout>
  </AppLayout>
)}
