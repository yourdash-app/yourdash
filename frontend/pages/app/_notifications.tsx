/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React, {useEffect, useState} from "react";
import Head from "next/head"
import {PushNotification} from "../../lib/pushNotification";
import * as localforage from "localforage";

export default function Notifications() {
    const [notifications, setNotifications] = useState([] as {
        title: string, content: string, urgency: 1 | 2 | 3, id: string
    }[])
    useEffect(() => {
        let listener = (e: CustomEvent) => {
            setNotifications([e.detail, ...notifications])
        }
        localforage.getItem("DEVDASH_notifications", (notification) => {
            if (notification === null) return
            setNotifications([...notifications, ...notification])
        })
        // @ts-ignore
        window.addEventListener("DEVDASH_push_notification", listener)
        return () => {
            // @ts-ignore
            window.removeEventListener("DEVDASH_push_notification", listener)
        }
    })
    return <>
        <Head>
            <title>DevDash | Notifications</title>
        </Head>
        <div className={"grid grid-cols-[1fr,auto] h-screen w-full bg-bg-light-secondary"}>
            <div className={"p-4"}>
                {/* @ts-ignore */}
                {notifications !== [] ? (notifications.map(notification => {
                    return <div
                        key={notification.id}
                        className={"grid grid-cols-[1fr,auto] rounded-2xl bg-content-normal p-2 text-text-primary text-2xl shadow-xl mb-2 select-none"}>
                        <div className={"flex flex-col"}>
                            <h2>
                                {notification.title}
                            </h2>
                            <h3 className={"text-text-secondary text-xl"}>
                                {notification.content}
                            </h3>
                        </div>
                        <div className={"flex flex-col p-2 select-none"}>
                            <button
                                className={"rounded-lg bg-content-normal hover:bg-content-light active:bg-content-dark p-2 transition-colors flex"}
                                onClick={() => {
                                    setNotifications([...notifications.filter((notif) => {
                                        if (notif.id !== notification.id) return notif
                                        return false
                                    })])
                                    localforage.setItem("DEVDASH_notifications", [...notifications.filter((notif) => {
                                        if (notif.id !== notification.id) return notif
                                        return false
                                    })])
                                }}><span className={"material-icons-round"}>close</span></button>
                        </div>
                    </div>
                })) : <div>You have no more notifications 😄</div>}
            </div>
            <div className={"flex flex-col bg-content-normal shadow-2xl"}>
                <h1 className={"w-full text-center text-3xl pl-16 pr-16 p-6 mb-5 text-text-primary shadow-md"}>Notifications</h1>
                <SideButton title={"Clear All"} onClick={() => {
                    setNotifications([])
                    localforage.setItem("DEVDASH_notifications", [])
                }}/>

                <SideButton title={"Debug"} onClick={() => {
                    new PushNotification()
                        .setTitle("Debug Test" + notifications.length)
                        .setContent("This is a debug test notification")
                        .setUrgency(2)
                        .push()
                }}/>
            </div>
        </div>
    </>
}

function SideButton(props: { title: string, onClick: () => void }) {
    return <button
        className={"pl-8 pr-8 p-2 rounded-lg shadow-lg bg-content-normal hover:bg-content-light active:bg-content-dark transition-colors text-text-primary ml-4 mr-4 mb-2"}
        onClick={props.onClick}>{props.title}</button>
}