import Chiplet from "ui";
import AppLayout from "../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";
import { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "../../../server";
import { type CurrentUser } from "types/userManagement/currentUser";
import Head from "next/head";
import { FlowTemplates } from "../../../../server/modules/flow/types/FlowTemplates";

const TasksIndex: NextPageWithLayout = () => {
    const [fullName, setFullName] = useState("");

    useEffect(() => {
        verifyAndReturnJson(
            SERVER.get(`/userManagement/current/user`),
            (data: CurrentUser) => {
                setFullName(`${data.name.first} ${data.name.last}`);
            },
            (err) => {
                console.error(err);
            }
        );
        setFullName("");
    }, []);

    return (
        <>
            <Head>
                <title>YourDash | Flow</title>
            </Head>
            <div className={styles.root}>
                <Chiplet.Column className={styles.sidebar}>
                    <h1>YourDash Flow</h1>
                    <div className={styles.sidebarCollapsibleButtons}>
                        <CreateButton />
                        <CreateFromTemplateButton />
                    </div>
                    <Chiplet.Button>Open File</Chiplet.Button>
                </Chiplet.Column>
                <section className={styles.main}>
                    <h1>Welcome back, {fullName}</h1>
                    <Chiplet.Column className={styles.recentProjects}>
                        <Chiplet.Card
                            onClick={() => {
                                return 0;
                            }}
                        >
                            <span>Project 0</span>
                        </Chiplet.Card>
                        <Chiplet.Card
                            onClick={() => {
                                return 0;
                            }}
                        >
                            <span>Project 1</span>
                        </Chiplet.Card>
                        <Chiplet.Card
                            onClick={() => {
                                return 0;
                            }}
                        >
                            <span>Project 2</span>
                        </Chiplet.Card>
                        <Chiplet.Card
                            onClick={() => {
                                return 0;
                            }}
                        >
                            <span>Project 3</span>
                        </Chiplet.Card>
                    </Chiplet.Column>
                </section>
            </div>
        </>
    );
};

export default TasksIndex;

TasksIndex.getLayout = (page) => {
    return <AppLayout>{page}</AppLayout>;
};

const CreateButton: React.FC = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [projectName, setProjectName] = useState("");

    return (
        <div style={{ width: "100%" }}>
            <Chiplet.Dialog
                onClose={() => {
                    setShowDialog(false);
                }}
                visible={showDialog}
                title={"Create a flow project"}
            >
                <Chiplet.TextInput
                    placeholder={"Project name"}
                    onChange={(e) => {
                        setProjectName(e.currentTarget.value);
                    }}
                    value={projectName}
                />
                <Chiplet.Button
                    vibrant={true}
                    onClick={() => {
                        verifyAndReturnJson(
                            SERVER.post(`/flow/project/create`, {
                                body: JSON.stringify({ name: projectName, template: FlowTemplates.BLANK }),
                            }),
                            (data) => {
                                if (data.success) return console.log("created flow :D");
                            },
                            () => {
                                console.error("unable to create flow");
                            }
                        );
                    }}
                >
                    Create
                </Chiplet.Button>
            </Chiplet.Dialog>
            <Chiplet.Button
                vibrant
                style={{
                    width: "100%",
                }}
                onClick={() => {
                    return setShowDialog(true);
                }}
            >
                Create
            </Chiplet.Button>
        </div>
    );
};

const CreateFromTemplateButton: React.FC = () => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div style={{ width: "100%" }}>
            <Chiplet.Dialog
                onClose={() => {
                    setShowDialog(false);
                }}
                visible={showDialog}
            >
                <h1>test</h1>
            </Chiplet.Dialog>
            <Chiplet.Button
                style={{
                    width: "100%",
                }}
                onClick={() => {
                    return setShowDialog(true);
                }}
            >
                Create from template
            </Chiplet.Button>
        </div>
    );
};
