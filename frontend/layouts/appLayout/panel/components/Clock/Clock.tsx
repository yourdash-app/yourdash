import React, { useEffect, useState } from "react";
import styles from "./Clock.module.scss";

const Clock: React.FC = () => {
    const [currentTime, setCurrentTime] = useState("00:00");
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

    return <p className={styles.component}>{currentTime}</p>;
};

export default Clock;
