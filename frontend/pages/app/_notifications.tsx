import React from "react";
import {PushNotification} from "../../lib/pushNotification";

export default function Notifications() {
    return <div>
        <button onClick={() => {
            let notification = new PushNotification()
            notification.setContent("Hello from _notifications.tsx")
            notification.setTitle("Hello :D")
            notification.setUrgency(3)
            notification.push()
        }
        }>
            Create Notification
        </button>
    </div>
}