import Head from "next/head";
import React, { useEffect, useState } from "react";
import AppLayout from "../../../layouts/appLayout/AppLayout";
import SERVER, { verifyAndReturnJson } from "../../../server";
import { NextPageWithLayout } from "../../page";
import styles from "./index.module.scss";
import { useRouter } from "next/router";
import DashWidget from "types/core/dash/dashWidget";
import Chiplet from "ui";

const Dash: NextPageWithLayout = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [currentTime, setCurrentTime] = useState("00:01");
    const [widgets] = useState(["TasksList", "Notes"] as DashWidget[]);

    useEffect(() => {
        verifyAndReturnJson(
            SERVER.get("/userManagement/current/user"),
            (user) => {
                setName(`${user?.name?.first} ${user?.name?.last}`);
            },
            () => {
                setName("ERROR");
            }
        );
    }, []);

    useEffect(() => {
        setCurrentTime(
            `${new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`}:${
                new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`
            }`
        );

        const interval = setInterval(() => {
            setCurrentTime(
                `${new Date().getHours() < 10 ? `0${new Date().getHours()}` : `${new Date().getHours()}`}:${
                    new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`
                }`
            );
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    if (name === "") return <div />;

    return (
        <>
            <Head>
                <title>YourDash | Dashboard</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.welcome}>
                    <span className={styles.clock}>{currentTime}</span>
                    <span>Hiya, {name}</span>
                </div>
                <div className={styles.main}>
                    {widgets.length === 0 ? (
                        <div className={styles.homeMessage}>
                            <div>
                                <h1>Oh no!</h1>
                                <p>It appears that you have no dash widgets installed.</p>
                                <Chiplet.Button
                                    onClick={() => {
                                        router.push(`/app/store`);
                                    }}
                                    vibrant
                                >
                                    Explore dash widgets
                                </Chiplet.Button>
                            </div>
                        </div>
                    ) : (
                        widgets.map((widget) => {
                            const Mod = require(`./widgets/${widget}/${widget}.tsx`);
                            return <Mod.default key={widget} />;
                        })
                    )}
                </div>
            </div>
        </>
    );
};
export default Dash;

Dash.getLayout = (page) => {
    return <AppLayout transparentBackground>{page}</AppLayout>;
};
