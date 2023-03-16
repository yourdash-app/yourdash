import Chiplet from "~/chipletui";
import { useEffect, useState } from "react";
import styles from "../../../checklist/personal/list/listId.module.scss";
import moduleStyles from "./Checklist.module.scss";
import ListTask from "../../../checklist/components/ListTask/ListTask";
import SERVER, { verifyAndReturnJson } from "../../../../../server";
import { TasksList } from "types/checklist/list";
import { useRouter } from "next/router";

function LoadPersonalLists(setPersonalLists: (_value: { name: string; id: string }[]) => void) {
    verifyAndReturnJson(
        SERVER.get(`/checklist/personal/lists`),
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
        SERVER.get(`/checklist/personal/list/${listId}`),
        (data) => {
            setList(data);
        },
        () => {
            console.error(`unable to fetch tasks`);
        }
    );
}

const Checklist: React.FC = () => {
    const router = useRouter();
    const [possibleLists, setPossibleLists] = useState([] as { name: string; id: string }[]);
    const [selectedListId, setSelectedListId] = useState<string>("");
    const [listData, setListData] = useState<TasksList | null>(null);

    useEffect(() => {
        LoadPersonalLists((data) => {
            return setPossibleLists(data);
        });
    }, []);

    useEffect(() => {
        if (selectedListId === "") return;

        loadList(selectedListId, (data) => {
            return setListData(data);
        });
    }, [selectedListId]);

    if (possibleLists.length === 0)
        return (
            <Chiplet.Card
                onClick={() => {
                    return router.push("/app/checklist");
                }}
            >
                <h2 className={moduleStyles.title} style={{ marginBottom: 0 }}>
                    Personal Tasks
                </h2>
            </Chiplet.Card>
        );

    return (
        <Chiplet.Card>
            <Chiplet.Column>
                <h2 className={moduleStyles.title}>Personal Tasks</h2>
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
                    {listData?.tasks &&
                        listData.tasks.map((task, ind) => {
                            return (
                                <ListTask
                                    /* eslint-disable-next-line react/no-array-index-key */
                                    key={task.title + ind}
                                    task={task}
                                    onClick={() => {
                                        return router.push(`/app/checklist/personal/list/${selectedListId}`);
                                    }}
                                    selectTask={() => {
                                        return 0;
                                    }}
                                    onDelete={() => {
                                        verifyAndReturnJson(
                                            SERVER.delete(`/checklist/personal/list/${listData.id}/task/${ind}`),
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
                        })}
                    {selectedListId !== "" && (
                        <Chiplet.Button
                            onClick={() => {
                                verifyAndReturnJson(
                                    SERVER.get(`/checklist/personal/list/${selectedListId}/create/task`),
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
                    )}
                </Chiplet.Column>
            </Chiplet.Column>
        </Chiplet.Card>
    );
};

export default Checklist;
