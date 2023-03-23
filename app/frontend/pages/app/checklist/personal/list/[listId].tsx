import { useEffect, useState } from "react";
import AppLayout from "../../../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../../../page";
import SERVER, { verifyAndReturnJson } from "../../../../../server";
import { useRouter } from "next/router";
import styles from "./listId.module.scss";
import ListTask from "../../components/ListTask/ListTask";
import Chiplet from "~/chipletui";
import ChecklistLayout from "../../components/ChecklistLayout";

function loadList(listId: string, setList: (_value: any) => void) {
    verifyAndReturnJson(
        SERVER.get(`/checklist/personal/list/${listId}`),
        (data) => {
            setList(data);
        },
        () => {
            console.error(`unable to fetch tasks`);
        }
    );
}

const TasksPersonalList: NextPageWithLayout = () => {
    const router = useRouter();

    const [activeTask, setActiveTask] = useState(null as null | number);
    // const [ selectedTasks, setSelectedTasks ] = useState([] as number[])
    const [activeTaskData, setActiveTaskData] = useState(null as null | any);
    const [listData, setListData] = useState(null as TasksList | null);
    const [showListSettings, setShowListSettings] = useState(false);
    const [unsavedListData, setUnsavedListData] = useState(null as any | null);
    const [pageChanging, setPageChanging] = useState(false);

    useEffect(() => {
        if (!router.query.listId) return;

        if (typeof router.query.listId === "string") {
            loadList(router.query.listId, (list) => {
                setListData(list);
                setUnsavedListData(list);
            });
        } else {
            router.push(`/app/checklist`);
        }
    }, [router]);

    useEffect(() => {
        if (activeTask === null) return;

        verifyAndReturnJson(
            SERVER.get(`/checklist/personal/list/${router.query.listId}/task/${activeTask}`),
            (data) => {
                setActiveTaskData(data);
            },
            () => {
                console.error(`unable to fetch task data`);
            }
        );
    }, [activeTask, router.query.listId]);

    if (!listData) return <div />;
    if (!unsavedListData) return <div />;

    return (
        <div className={`${styles.root} ${pageChanging && styles.slideOut}`}>
            {/* Manage List Settings Backdrop */}
            <button
                type={"button"}
                className={`${styles.listSettingsBackdrop} ${showListSettings && styles.visible}`}
                onClick={() => {
                    setShowListSettings(false);
                }}
            />

            {/* Manage List Settings Popup */}
            <Chiplet.Card className={`${styles.listSettings} ${showListSettings && styles.visible}`}>
                <Chiplet.Row className={styles.header}>
                    <h2>Manage list settings</h2>
                    <Chiplet.IconButton
                        icon="x-16"
                        onClick={() => {
                            setShowListSettings(false);
                        }}
                    />
                </Chiplet.Row>
                <main className={styles.main}>
                    <p>Title</p>
                    <Chiplet.TextInput
                        defaultValue={unsavedListData.name}
                        placeholder="Untitled"
                        onChange={(e) => {
                            if (!unsavedListData) return;

                            setUnsavedListData({
                                description: unsavedListData.description,
                                id: unsavedListData.id,
                                name: e.currentTarget.value,
                                tags: unsavedListData.tags,
                                tasks: unsavedListData.tasks,
                            });
                        }}
                    />
                    <p>Description</p>
                    <Chiplet.TextBox
                        style={{
                            resize: "vertical",
                            transition: "none",
                        }}
                        defaultValue={unsavedListData.description}
                        onChange={(e) => {
                            if (!unsavedListData) return;

                            setUnsavedListData({
                                description: e.currentTarget.value,
                                id: unsavedListData.id,
                                name: unsavedListData.name,
                                tags: unsavedListData.tags,
                                tasks: unsavedListData.tasks,
                            });
                        }}
                    />
                    <p>Tags</p>
                    <Chiplet.Tags tags={unsavedListData.tags} />
                </main>

                <Chiplet.Button
                    onClick={() => {
                        verifyAndReturnJson(
                            SERVER.post(`/checklist/personal/list/${router.query.listId}`, {
                                body: JSON.stringify(unsavedListData),
                            }),
                            () => {
                                setListData(unsavedListData);
                            },
                            () => {
                                console.error(`unable to save list data`);
                            }
                        );
                        setShowListSettings(false);
                    }}
                    vibrant
                >
                    Save and close
                </Chiplet.Button>
            </Chiplet.Card>

            {/* List Header */}
            <Chiplet.Column>
                <Chiplet.Row className={styles.header}>
                    <Chiplet.IconButton
                        icon="chevron-left-16"
                        onClick={() => {
                            router.prefetch(`/app/checklist`);
                            setPageChanging(true);
                            setTimeout(() => {
                                router.push(`/app/checklist`);
                            }, 500);
                        }}
                    />
                    <h1>{listData.name}</h1>
                    <Chiplet.IconButton
                        icon="plus-16"
                        onClick={() => {
                            setActiveTask(null);
                            verifyAndReturnJson(
                                SERVER.get(`/checklist/personal/list/${listData.id}/create/task`),
                                () => {
                                    if (!router.query.listId) return;

                                    if (typeof router.query.listId === "string") {
                                        loadList(router.query.listId, (list) => {
                                            setListData(list);
                                            setUnsavedListData(list);
                                        });
                                    } else {
                                        router.push(`/app/checklist`);
                                    }
                                },
                                () => {
                                    console.error("unable to create task");
                                }
                            );
                        }}
                    />
                    <Chiplet.IconButton
                        icon="gear-16"
                        onClick={() => {
                            setShowListSettings(true);
                        }}
                    />
                </Chiplet.Row>

                {/* Tasks View */}
                <Chiplet.Column className={styles.tasksView}>
                    {listData.tasks ? (
                        listData.tasks.map((task, ind) => {
                            return (
                                <ListTask
                                    /* eslint-disable-next-line react/no-array-index-key */
                                    key={task.title + ind}
                                    task={task}
                                    onClick={() => {
                                        return setActiveTask(ind);
                                    }}
                                    selectTask={(value) => {
                                        console.log(`task: ${task.title}:${value}`);
                                    }}
                                    onDelete={() => {
                                        verifyAndReturnJson(
                                            SERVER.delete(`/checklist/personal/list/${listData.id}/task/${ind}`),
                                            () => {
                                                if (!router.query.listId) return;

                                                if (typeof router.query.listId === "string") {
                                                    loadList(router.query.listId, (list) => {
                                                        setListData(list);
                                                        setUnsavedListData(list);
                                                    });
                                                    console.log("success");
                                                } else {
                                                    router.push(`/app/checklist`);
                                                }
                                            },
                                            (err) => {
                                                console.error(err);
                                            }
                                        );
                                    }}
                                />
                            );
                        })
                    ) : (
                        <h1>No tasks</h1>
                    )}
                </Chiplet.Column>
            </Chiplet.Column>

            <section className={`${styles.taskProperties} ${activeTask !== null && styles.taskPropertiesOpen}`}>
                <Chiplet.Column>
                    <Chiplet.Row>
                        <Chiplet.TextInput
                            style={{ flex: 1 }}
                            value={activeTaskData?.title || ""}
                            onChange={(e) => {
                                e.preventDefault();
                                if (!activeTaskData) return;

                                setActiveTaskData({
                                    ...activeTaskData,
                                    title: e.currentTarget.value,
                                });
                            }}
                        />
                        <Chiplet.IconButton
                            style={{ aspectRatio: "1 / 1" }}
                            icon="x-16"
                            onClick={() => {
                                setActiveTask(null);
                            }}
                        />
                    </Chiplet.Row>
                    <p>Description</p>
                    <Chiplet.TextBox
                        style={{
                            flex: 1,
                            flexDirection: "row",
                        }}
                        defaultValue={activeTaskData?.description}
                        onChange={(e) => {
                            if (!activeTaskData) return;

                            setActiveTaskData({
                                ...activeTaskData,
                                description: e.currentTarget.value,
                            });
                        }}
                    />
                    <p>Tags</p>
                    <Chiplet.Tags compact tags={activeTaskData?.tags || []} />
                    <p>Assignees</p>
                    {/*
              <Card style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "0.5rem",
                transition: "var(--transition)",
              }}>
                <Assignees assignees={activeTaskData?.assignees || []} />
                <SegmentButton onClick={() => {
                  verifyAndReturnJson(
                    SERVER.post(`/checklist/personal/list/${listData.id}/task/${activeTask}/assignees/`, { body: JSON.stringify([ ... activeTaskData.assignees, "bob" ]) }),
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
                    <Chiplet.Button
                        onClick={() => {
                            setActiveTask(null);
                            verifyAndReturnJson(
                                SERVER.post(`/checklist/personal/list/${router.query.listId}/task/${activeTask}`, {
                                    body: JSON.stringify(activeTaskData),
                                }),
                                () => {
                                    if (!router.query.listId) return;

                                    if (typeof router.query.listId === "string") {
                                        loadList(router.query.listId, (list) => {
                                            setListData(list);
                                            setUnsavedListData(list);
                                        });
                                    } else {
                                        router.push(`/app/checklist`);
                                    }
                                },
                                () => {
                                    console.error(`unable to save new task data`);
                                }
                            );
                        }}
                    >
                        Apply
                    </Chiplet.Button>
                </Chiplet.Column>
            </section>
        </div>
    );
};

export default TasksPersonalList;

TasksPersonalList.getLayout = (page) => {
    return (
        <AppLayout>
            <ChecklistLayout>{page}</ChecklistLayout>
        </AppLayout>
    );
};
