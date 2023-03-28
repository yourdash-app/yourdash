import React, { useEffect, useState } from "react";
import AppLayout from "../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";
import SERVER, { verifyAndReturnJson } from "../../../server";
import { useRouter } from "next/navigation";
import Chiplet from "~/frontend/chipletui";
import ChecklistLayout from "./components/ChecklistLayout";

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

const TasksIndex: NextPageWithLayout = () => {
    const router = useRouter();

    const [personalLists, setPersonalLists] = useState(null as { name: string; id: string }[] | null);

    useEffect(() => {
        LoadPersonalLists((lists) => {
            return setPersonalLists(lists);
        });
    }, []);

    if (personalLists === null) return <div />;

    return (
        <Chiplet.Column className={styles.main}>
            <Chiplet.Row className={styles.title}>
                <Chiplet.Icon name="yourdash-logo" useDefaultColor />
                <h1>CheckList</h1>
            </Chiplet.Row>
            <section className={styles.section}>
                <section className={styles.sectionHeader}>
                    <h3>Personal lists</h3>
                    <Chiplet.IconButton
                        onClick={() => {
                            verifyAndReturnJson(
                                SERVER.post("/checklist/personal/list/create", { body: "" }),
                                () => {
                                    LoadPersonalLists((lists) => {
                                        return setPersonalLists(lists);
                                    });
                                },
                                () => {
                                    console.error("unable to create a new list");
                                }
                            );
                        }}
                        icon="plus-16"
                    />
                </section>
                <Chiplet.Column>
                    {personalLists.length !== 0 ? (
                        personalLists.map((list) => {
                            return (
                                <Chiplet.Card
                                    className={styles.list}
                                    key={list.id}
                                    onClick={() => {
                                        router.push(`/app/checklist/personal/list/${list.id}`);
                                    }}
                                >
                                    <span>{list.name}</span>
                                    <Chiplet.IconButton
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            verifyAndReturnJson(
                                                SERVER.delete(`/checklist/personal/list/delete/${list.id}`),
                                                () => {
                                                    LoadPersonalLists((lists) => {
                                                        return setPersonalLists(lists);
                                                    });
                                                },
                                                () => {
                                                    console.error(`unable to delete list`);
                                                }
                                            );
                                        }}
                                        icon="trash-16"
                                    />
                                </Chiplet.Card>
                            );
                        })
                    ) : (
                        <Chiplet.Card className={styles.message}>
                            <Chiplet.Column>
                                <h2>Oh no!</h2>
                                <p>You have no personal lists :(</p>
                                <Chiplet.Button
                                    onClick={() => {
                                        verifyAndReturnJson(
                                            SERVER.post("/checklist/personal/list/create", { body: "" }),
                                            () => {
                                                LoadPersonalLists((lists) => {
                                                    return setPersonalLists(lists);
                                                });
                                            },
                                            () => {
                                                console.error("unable to create a new list");
                                            }
                                        );
                                    }}
                                    vibrant
                                >
                                    Create a list
                                </Chiplet.Button>
                            </Chiplet.Column>
                        </Chiplet.Card>
                    )}
                </Chiplet.Column>
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
                <row>
                  <img src={org.icon} alt="" />
                  <span>{org.name}</span>
                </row>
              </CardButton>
            })
          }
        </ColContainer>
      </section> */}
        </Chiplet.Column>
    );
};

export default TasksIndex;

TasksIndex.getLayout = (page) => {
    return (
        <AppLayout>
            <ChecklistLayout>{page}</ChecklistLayout>
        </AppLayout>
    );
};
