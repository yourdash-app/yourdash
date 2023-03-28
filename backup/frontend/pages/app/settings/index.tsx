import { useRouter } from "next/router";
import AppLayout from "../../../layouts/appLayout/AppLayout";
import { NextPageWithLayout } from "../../page";
import SettingsLayout from "./components/SettingsLayout/SettingsLayout";
import styles from "./index.module.scss";
import Chiplet from "~/frontend/chipletui";
import { useEffect, useState } from "react";
import SERVER, { verifyAndReturnJson } from "../../../server";
import { YourDashCorePermissions } from "../../../../backend/src/helpers/user/types";

const SettingsIndex: NextPageWithLayout = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        verifyAndReturnJson(
            SERVER.get("/userManagement/current/user/permissions"),
            (data) => {
                if (data.indexOf( YourDashCorePermissions.Administrator) !== -1) {
                    setIsAdmin(true);
                }
            },
            () => {
                return console.error("unable to fetch `/userManagement/current/user/permissions`");
            }
        );
    }, []);

    const router = useRouter();
    return (
        <Chiplet.Column className={styles.root}>
            <div className={styles.hero}>
                <h2>Settings</h2>
            </div>
            {isAdmin && <h2 className={styles.subtitle}>Personal</h2>}
            <main className={styles.grid}>
                <Chiplet.Card
                    className={styles.card}
                    onClick={() => {
                        router.push(`/app/settings/user/profile`);
                    }}
                >
                    Profile
                </Chiplet.Card>
                <Chiplet.Card
                    className={styles.card}
                    onClick={() => {
                        router.push(`/app/settings/user/panel`);
                    }}
                >
                    Panel
                </Chiplet.Card>
                <Chiplet.Card
                    className={styles.card}
                    onClick={() => {
                        router.push(`/app/settings/user/notifications`);
                    }}
                >
                    Notifications
                </Chiplet.Card>
                <Chiplet.Card
                    className={styles.card}
                    onClick={() => {
                        router.push(`/app/settings/user/theme`);
                    }}
                >
                    Color theme
                </Chiplet.Card>
            </main>
            {isAdmin && (
                <>
                    <h2 className={styles.subtitle}>Server Administration</h2>
                    <main className={styles.grid}>
                        <Chiplet.Card
                            className={styles.card}
                            onClick={() => {
                                router.push(`/app/settings/administrator/default-theme`);
                            }}
                        >
                            Default theme
                        </Chiplet.Card>
                        <Chiplet.Card
                            className={styles.card}
                            onClick={() => {
                                router.push(`/app/settings/administrator/users`);
                            }}
                        >
                            Users
                        </Chiplet.Card>
                        <Chiplet.Card
                            className={styles.card}
                            onClick={() => {
                                router.push(`/app/settings/administrator/control-panel`);
                            }}
                        >
                            Control panel
                        </Chiplet.Card>
                    </main>
                </>
            )}
        </Chiplet.Column>
    );
};

export default SettingsIndex;

SettingsIndex.getLayout = (page) => {
    return (
        <AppLayout>
            <SettingsLayout title={"no-title"}>{page}</SettingsLayout>
        </AppLayout>
    );
};
