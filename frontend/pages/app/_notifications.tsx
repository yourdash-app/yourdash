import React from "react";
import {PushNotification} from "../../lib/pushNotification";
import Head from "next/head"

export default function Notifications() {
    return <div>
        <Head>
            <title>DevDash | Notifications</title>
        </Head>
        <button onClick={() => {
            new PushNotification()
                .setContent("Hello from _notifications.tsx")
                .setTitle("Hello :D")
                .setUrgency(3)
                .push()
        }}>
            Create Notification
        </button>
    </div>
}