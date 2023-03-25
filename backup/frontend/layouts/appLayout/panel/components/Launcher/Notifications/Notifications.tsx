import React from "react";
import Chiplet from "~/frontend/chipletui";
import styles from "../../../Panel.module.scss";

export interface INotifications {
    visible: boolean;
}

const Notifications: React.FC<INotifications> = ({ visible }) => {
    return (
        <div>
            <Chiplet.Column
                className={styles.accountNotificationList}
                style={{
                    opacity: !visible ? "0" : "1",
                    pointerEvents: visible ? "all" : "none",
                    transform: !visible ? "scale(0.9)" : "scale(1)",
                }}
            >
                <Chiplet.Card>
                    <Chiplet.Row data-header>
                        <img src={`/assets/productLogos/yourdash.svg`} alt="" />
                        <span>Notification Test</span>
                    </Chiplet.Row>
                    <Chiplet.Column>
                        <p>This is some sample text for a notification</p>
                        <Chiplet.Button
                            onClick={() => {
                                console.log("Implenment me!");
                            }}
                        >
                            Ok
                        </Chiplet.Button>
                    </Chiplet.Column>
                </Chiplet.Card>
            </Chiplet.Column>
        </div>
    );
};

export default Notifications;
