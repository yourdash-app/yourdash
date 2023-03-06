import Chiplet from "ui";
import { useEffect, useState } from "react";
import styles from "../../../tasks/personal/list/listId.module.scss";
import ListTask from "../../../tasks/components/ListTask/ListTask";
import SERVER, { verifyAndReturnJson } from "../../../../../server";
import { TasksList } from "../../../../../../../packages/types/tasks/list";
import { useRouter } from "next/router";

function LoadPersonalLists(setPersonalLists: (_value: { name: string; id: string }[]) => void) {
    verifyAndReturnJson(
        SERVER.get(`/tasks/personal/lists`),
        (data) => {
            setPersonalLists(data.lists || []);
        },
        () => {
            console.error(`unable to fetch the user's personal lists`);
        }
    );
}

function loadList(listId: string, setList: (_value: TasksList) => void) {
    verifyAndReturnJson(
        SERVER.get(`/tasks/personal/list/${listId}`),
        (data) => {
            setList(data);
        },
        () => {
            console.error(`unable to fetch tasks`);
        }
    );
}

const TasksList: React.FC = () => {
    const router = useRouter();
    const [possibleLists, setPossibleLists] = useState([] as { name: string; id: string }[]);
    const [selectedListId, setSelectedListId] = useState<string>("");
    const [listData, setListData] = useState<TasksList | null>(null);

    useEffect(() => {
        LoadPersonalLists((data) => {
            setSelectedListId(data?.[0].id || "");
            return setPossibleLists(data);
        });
    }, []);

    useEffect(() => {
        loadList(selectedListId, (data) => {
            return setListData(data);
        });
    }, [selectedListId]);

    return (
        <Chiplet.Card>
            <Chiplet.Column>
                <Chiplet.DropdownButton
                    items={possibleLists.map((list) => {
                        return {
                            name: list.name,
                            onClick() {
                                setSelectedListId(list.id);
                            },
                        };
                    })}
                >
                    select a list
                </Chiplet.DropdownButton>
                <Chiplet.Column className={styles.tasksView} style={{ padding: "unset" }}>
                    {listData?.tasks ? (
                        listData.tasks.map((task, ind) => {
                            return (
                                <ListTask
                                    /* eslint-disable-next-line react/no-array-index-key */
                                    key={task.title + ind}
                                    task={task}
                                    onClick={() => {
                                        return router.push(`/app/tasks/personal/list/${selectedListId}`);
                                    }}
                                    selectTask={() => {
                                        return 0;
                                    }}
                                    onDelete={() => {
                                        verifyAndReturnJson(
                                            SERVER.delete(`/tasks/personal/list/${listData.id}/task/${ind}`),
                                            () => {
                                                if (!selectedListId) return;

                                                loadList(selectedListId, (list) => {
                                                    setListData(list);
                                                });
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
                    <Chiplet.Button
                        onClick={() => {
                            verifyAndReturnJson(
                                SERVER.get(`/tasks/personal/list/${selectedListId}/create/task`),
                                () => {
                                    if (!selectedListId) return;

                                    loadList(selectedListId, (list) => {
                                        setListData(list);
                                    });
                                },
                                () => {
                                    console.error("unable to create task");
                                }
                            );
                        }}
                    >
                        Add task
                    </Chiplet.Button>
                </Chiplet.Column>
            </Chiplet.Column>
        </Chiplet.Card>
    );
};

export default TasksList;
