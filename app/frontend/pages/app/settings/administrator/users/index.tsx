import AppLayout from "../../../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../../../page";
import SettingsLayout from "../../components/SettingsLayout/SettingsLayout";
import Chiplet from "~/chipletui";
import React from "react";
import styles from "./index.module.scss";
import { useRouter } from "next/router";

const Index: NextPageWithLayout = () => {
    const router = useRouter();

    const [users, setUsers] = React.useState([] as { name: { first: string; last: string }; username: string }[]);

    React.useEffect(() => {
        setUsers([
            {
                name: {
                    first: "admin",
                    last: "istrator",
                },
                username: "admin",
            },
            {
                name: {
                    first: "admin2",
                    last: "istrator",
                },
                username: "admin2",
            },
            {
                name: {
                    first: "admin3",
                    last: "istrator",
                },
                username: "admin3",
            },
        ]);
    }, []);

    return (
        <Chiplet.Column style={{ padding: "1rem" }}>
            {users.map((user) => {
                return (
                    <Chiplet.Card
                        key={user.username}
                        onClick={() => {
                            return router.push(`/app/settings/administrator/users/${user.username}/`);
                        }}
                    >
                        <span className={styles.userCardName}>
                            {user.name.first}
                            {user.name.last}
                        </span>
                        <span className={styles.userCardUserName}>{user.username}</span>
                    </Chiplet.Card>
                );
            })}
        </Chiplet.Column>
    );
};

export default Index;

Index.getLayout = (page) => {
    return (
        <AppLayout>
            <SettingsLayout title={"Manage server users"}>{page}</SettingsLayout>
        </AppLayout>
    );
};
