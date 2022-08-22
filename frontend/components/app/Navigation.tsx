/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import { NextRouter, useRouter, withRouter } from "next/router";
import React from "react";
import * as localforage from "localforage";
import CommandPallet from "./CommandPallet";
import createUuid from "../../lib/libUuid";
import { IconTypings } from "../../lib/materialIconTypings";
import setTheme from "../../lib/setTheme";

class Navigation extends React.Component<{
    router: NextRouter; pageId: string;
}> {
    state: {
        githubUserData: any; notifications: { title: string; urgency: 1 | 2 | 3; content: "", id: string }[]; expanded: boolean; isDisabled: boolean; isRemindedToLogin: boolean; theme: "dark" | "light" | "system"; isRightAligned: boolean
    } = {
            githubUserData: {},
            notifications: [],
            expanded: false,
            isDisabled: false,
            isRemindedToLogin: true,
            theme: "system",
            isRightAligned: false
        };

    notificationListener = (e: CustomEvent) => {
        localforage.getItem("DEVDASH_notifications", notifications => {
            if (notifications === null) return localforage.setItem("DEVDASH_notifications", [ e.detail ])
            localforage.setItem("DEVDASH_notifications", [ e.detail, notifications ])
        })
        this.setState({
            notifications: [ e.detail, ...this.state.notifications ]
        })
    }

    componentDidMount() {
        this.setState({ theme: localStorage.getItem("themeMode") })
        // @ts-ignore
        window.addEventListener("DEVDASH_push_notification", this.notificationListener)
        localforage.getItem("githubUser").then(data => {
            if (data) {
                this.setState({
                    githubUserData: data,
                });
            } else {
                this.setState({
                    isDisabled: true, isRemindedToLogin: false,
                });
            }
        });
        localforage.getItem("settings").then((data: any) => {
            if (data?.collapseNavigationBar !== null && data?.collapseNavigationBar !== undefined) {
                this.setState({
                    expanded: !data?.collapseNavigationBar,
                });
            } else {
                this.setState({
                    expanded: true,
                });
            }
            if (data.isNavigationBarRightAligned) {
                this.setState({
                    isRightAligned: true
                })
            } else {
                this.setState({
                    isRightAligned: false
                })
            }
        });
    }

    componentWillUnmount() {
        // @ts-ignore
        window.removeEventListener("DEVDASH_push_notification", this.notificationListener)
    }

    render() {
        return (<>
            <CommandPallet />
            <div
                className={`${this.state.expanded ? "w-[5rem]" : "w-[3.5rem]"} h-screen bg-content-normal relative shadow-xl grid grid-rows-[1fr,auto]`}>
                <div className={"w-full"}>
                    <NavigationUser
                        isRightAligned={this.state.isRightAligned}
                        userData={this.state.githubUserData}
                        expanded={this.state.expanded} />
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={!this.state.isDisabled}
                        expanded={this.state.expanded}
                        hoverTag={`Login`}
                        activePage={"login"}
                        currentPageId={this.props.pageId}
                        onClick={() => {
                            this.props.router.push("/auth/login");
                        }}
                        icon="login"
                    />
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={this.state.isDisabled}
                        expanded={this.state.expanded}
                        hoverTag={`Home`}
                        activePage={"home"}
                        currentPageId={this.props.pageId}
                        onClick={() => {
                            this.props.router.push("/app/home");
                        }}
                        icon="home"
                    />
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={this.state.isDisabled}
                        expanded={this.state.expanded}
                        hoverTag={`Code Editor`}
                        currentPageId={this.props.pageId}
                        activePage={"code-editor"}
                        onClick={() => {
                            this.props.router.push("/app/code-editor");
                        }}
                        icon="code"
                    />
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={this.state.isDisabled}
                        expanded={this.state.expanded}
                        hoverTag={`Manage server`}
                        currentPageId={this.props.pageId}
                        activePage={"manage-server"}
                        onClick={() => {
                            this.props.router.push("/app/manage-server");
                        }}
                        icon="build"
                    />
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={this.state.isDisabled}
                        expanded={this.state.expanded}
                        hoverTag={`Git`}
                        currentPageId={this.props.pageId}
                        activePage={"git"}
                        onClick={() => {
                            this.props.router.push("/app/git");
                        }}
                        icon="wysiwyg"
                    />
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={this.state.isDisabled}
                        expanded={this.state.expanded}
                        hoverTag={`Todo`}
                        currentPageId={this.props.pageId}
                        activePage={"todo-list"}
                        onClick={() => {
                            this.props.router.push("/app/todo-list");
                        }}
                        icon="pending_actions"
                    />
                </div>
                <div className={`w-full shadow-inner pt-2`}>
                    {!this.state.isRemindedToLogin ? (<Notification
                        id={createUuid()}
                        expanded={this.state.expanded}
                        title={`Login?`}
                        content={`login to your github account to begin editing.`}
                        inputs={[ {
                            type: "button", label: "Login", onClick: () => {
                                this.props.router.push("/auth/login");
                            },
                        }, {
                            type: "button", label: "Remind me later", onClick: () => {
                                this.setState({
                                    isRemindedToLogin: true,
                                });
                            },
                        }, ]}
                        notifications={[]}
                        noClose={true}
                        setNotifications={() => {
                        }}
                        urgencyLevel={1} />) : null}
                    {this.state.notifications.map((notification, ind) => {
                        return <Notification key={ind} expanded={this.state.expanded} title={notification.title}
                            notifications={this.state.notifications}
                            setNotifications={(notifications => {
                                this.setState({
                                    notifications: notifications
                                })
                            })}
                            id={notification.id}
                            content={notification.content} urgencyLevel={notification.urgency} />
                    })}
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={this.state.isDisabled}
                        expanded={this.state.expanded}
                        hoverTag={`Toggle Color Theme ${this.state.theme === "light" ? "(Light Mode)" : this.state.theme === "dark" ? "(Dark Mode)" : "(System)"}`}
                        currentPageId={this.props.pageId}
                        activePage={""}
                        icon={this.state.theme === "light" ? "light_mode" : this.state.theme === "dark" ? "dark_mode" : "brightness_auto"}
                        onClick={() => {
                            if (this.state.theme === "dark") {
                                this.setState({
                                    theme: "light"
                                })
                                localStorage.setItem("themeMode", "light")
                                setTheme()
                            }
                            if (this.state.theme === "light") {
                                this.setState({
                                    theme: "system"
                                })
                                localStorage.setItem("themeMode", "system")
                                setTheme()
                            }
                            if (this.state.theme === "system") {
                                this.setState({
                                    theme: "dark"
                                })
                                localStorage.setItem("themeMode", "dark")
                                setTheme()
                            }
                        }}
                    />
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={false}
                        expanded={this.state.expanded}
                        hoverTag={this.state.expanded ? "Collapse Navigation" : "Expand Navigation"}
                        currentPageId={this.props.pageId}
                        activePage={"toggle"}
                        icon="switch_right"
                        onClick={() => {
                            this.setState({
                                expanded: !this.state.expanded, willAnimate: true,
                            });
                            localforage.getItem("settings").then((data: any) => {
                                // check if data contains collapseNavigationBar
                                if (data?.collapseNavigationBar !== null && data?.collapseNavigationBar !== undefined) {
                                    // if it does, update it
                                    data.collapseNavigationBar = !data.collapseNavigationBar;
                                    localforage.setItem("settings", data);
                                } else {
                                    // if it doesn't, create it
                                    localforage.setItem("settings", {
                                        collapseNavigationBar: !this.state.expanded,
                                    });
                                }
                            });
                        }}
                    />
                    <NavigationButton
                        isRightAligned={this.state.isRightAligned}
                        isDisabled={this.state.isDisabled}
                        expanded={this.state.expanded}
                        hoverTag={`Settings`}
                        currentPageId={this.props.pageId}
                        activePage={"settings"}
                        icon="settings"
                        onClick={() => {
                            this.props.router.push("/app/settings");
                        }}
                    />
                    <NavigationNotificationButton
                        isRightAligned={this.state.isRightAligned}
                        notificationsCount={this.state.notifications.length}
                        expanded={this.state.expanded} onClick={() => {
                            this.props.router.push("/app/notifications")
                        }} />
                </div>
            </div>
        </>);
    }
}

export default withRouter(Navigation);

function NavigationButton(props: {
    icon: IconTypings,
    hoverTag: string,
    onClick?: () => void,
    activePage?: string,
    currentPageId?: string,
    href?: string,
    expanded: boolean,
    isDisabled: boolean,
    isRightAligned: boolean
}) {
    let isActive = props.activePage === props.currentPageId;
    return (<div
        className={`relative group select-none ${props.isDisabled ? "pointer-events-none hidden" : null} cursor-pointer ${props.expanded ? "ml-2 mr-2 mb-1" : "ml-1 mr-1 mb-1"} flex`}
        onClick={props.onClick}>
        <div
            className={`absolute ${props.isRightAligned ? "right-full origin-right mr-3" : "left-full origin-left ml-3"} top-1/2 pointer-events-none -translate-y-1/2 opacity-0 bg-content-normal group-hover:opacity-100 motion-reduce:scale-x-100 group-hover:scale-x-100 scale-x-0 transition-all w-max pl-2 pr-2 pt-1 pb-1 rounded-lg text-text-primary group-hover:shadow-lg z-50`}>
            {props.hoverTag}
        </div>
        <span
            className={`${props.expanded ? "w-16 p-2 pt-1 pb-1" : "w-12 p-1"} rounded-lg hover:bg-content-light active:bg-content-dark flex items-center justify-center content-center transition-colors material-icons-round ${!isActive ? "text-text-inverted-secondary" : "text-text-secondary"} text-3xl hover:text-text-secondary active:text-text-primary`}>
            {props.icon}
        </span>
    </div>);
}

function NavigationUser(props: { userData: any, expanded: boolean, isRightAligned: boolean }) {
    const router = useRouter()
    return (<div
        className={`bg-none relative group select-none cursor-pointer ${props.expanded ? "pl-2" : "pl-1"} mb-2 flex`}>
        <div
            className={`${props.isRightAligned ? "right-full origin-right border-l-2 rounded-bl-xl" : "left-full origin-left border-r-2 rounded-br-xl"} absolute z-50 group-hover:shadow-2xl opacity-0 group-hover:opacity-100 group-hover:w-80 overflow-hidden w-0 transition-all bg-content-normal border-b-2 border-0 border-content-light`}>
            <div
                className={`h-24 cursor-auto p-2 transition-border duration-75 grid grid-cols-[auto,1fr] gap-1`}>
                <img
                    className={`aspect-square rounded-lg h-20`}
                    src={props.userData?.avatar_url ? props.userData.avatar_url + "&s=80" : require("./../../assets/default_user_profile.svg").default.src}
                    alt=""
                />
                <div className={`flex items-center justify-center flex-col text-left`}>
                    <h1 className={`text-2xl text-text-primary w-auto`}>
                        {props.userData?.name ? props.userData.name : "Please Login"}
                    </h1>
                    <h2 className={`text-2xl text-text-secondary w-auto`}>
                        {props.userData?.login ? "@" + props.userData.login : "to view your profile"}
                    </h2>
                </div>
            </div>
            {props.userData?.name ? <div className={"flex w-full p-2 shadow-inner"}>
                <button
                    className={"flex items-center transition-colors shadow-md justify-center bg-content-normal hover:bg-content-light active:bg-content-dark w-full h-full p-1 rounded-lg text-text-primary"}
                    onClick={() => {
                        localforage.removeItem("githubUser");
                        localforage.removeItem("githubToken");
                        router.push("/");
                    }}><span className={"material-icons-round"}>logout</span>Logout
                </button>
            </div> : null}
        </div>
        <div
            className={`w-full aspect-square overflow-hidden ${props.expanded ? "mr-2 mt-2" : "mr-1 mt-1"}`}>
            <img
                className={`w-full aspect-square rounded-lg`}
                src={props.userData?.avatar_url ? props.userData.avatar_url + (props.expanded ? "&s=64" : "&s=40") : require("./../../assets/default_user_profile.svg").default.src}
                alt=""
            />
        </div>
    </div>);
}

// FIXME: when notification is closed it is not removed from the localforage and the notifications page is not updated to show the current notification change
function Notification(props: {
    title: string; content: string; urgencyLevel: 1 | 2 | 3; expanded: boolean; inputs?: {
        type: "button"; label: string; onClick: () => void;
    }[]; notifications: any[]; noClose?: boolean; setNotifications: (setValue: any[]) => void; id: string
}) {
    return (<div
        className={`w-max max-w-7xl h-max max-h-4xl select-none ${props.urgencyLevel === 3 ? "bg-red-400" : props.urgencyLevel === 2 ? "bg-amber-400" : "bg-blue-400"} fixed ${props.expanded ? "left-24" : "left-16"} bottom-4 rounded-lg transition-all overflow-hidden shadow-2xl z-50`}>
        <div className={`bg-content-normal ml-2 w-auto h-full text-lg text-text-primary`}>
            <div className="flex items-center">
                <h2 className={`text-2xl pl-4 pr-4 pt-2 pb-2`}>{props.title}</h2>
                {!props.noClose ? <span
                    className={"material-icons-round text-white ml-auto mr-3 p-1 hover:bg-content-light active:bg-content-dark cursor-pointer rounded-md transition-colors"}
                    onClick={() => {
                        props.setNotifications([ ...props.notifications.filter(value => {
                            return value.id !== props.id
                        }) ])
                    }}>close</span> : null}
            </div>
            <p className={`text-text-secondary pl-4 pr-4 pb-2`}>{props.content}</p>
            {props.inputs ? (<div
                className={`w-full flex child:w-full relative before:bg-content-light before:h-0.5 before:left-0 before:top-0 before:w-full pt-0.5 before:absolute`}>
                {props.inputs.map((input, index) => {
                    if (input.type === "button") {
                        return (<div
                            key={index}
                            onClick={input.onClick}
                            className={`bg-content-normal hover:shadow-md hover:bg-content-light active:bg-content-dark active:shadow-inner transition-all m-1 rounded-lg h-10 flex items-center justify-center ml-0.5 mr-0.5 first:ml-1 last:mr-1 cursor-pointer`}>
                            {input.label}
                        </div>);
                    }
                })}
            </div>) : null}
        </div>
    </div>);
}

function NavigationNotificationButton(props: { expanded: boolean, onClick: () => void, notificationsCount: number, isRightAligned: boolean }) {
    return (<div
        onClick={props.onClick}
        className={`bg-none relative group select-none cursor-pointer ${props.expanded ? "ml-2 mr-2" : "ml-1 mr-1"} flex flex-col items-center justify-center group`}>
        <div
            className={`${props.isRightAligned ? "right-full origin-right mr-3" : "left-full origin-left ml-3"} absolute top-1/2 pointer-events-none -translate-y-1/2 opacity-0 bg-content-normal group-hover:opacity-100 group-hover:scale-100 scale-0 transition-all w-max p-1 pl-2 pr-2 rounded-lg text-text-primary group-hover:shadow-lg z-[50]`}>
            Notifications
        </div>
        <span
            className={`${props.expanded ? "w-16 p-2" : "w-10 p-1"} rounded-lg aspect-square group-hover:bg-content-light group-active:bg-content-dark flex items-center justify-center transition-all material-icons-round text-text-inverted-secondary text-3xl group-hover:text-text-secondary group-active:text-text-primary ${props.notificationsCount < 1 ? "mb-2" : null}`}>
            feedback
        </span>
        <NotificationCounter count={props.notificationsCount} expanded={props.expanded} />
    </div>);
}

function NotificationCounter(props: { count: number; expanded: boolean }) {
    return (
        <p className={`text-text-primary bg-red-400 rounded-lg w-full flex items-center justify-center transition-all ${props.count > 0 ? "scale-100 mb-2 mt-1 h-6" : "scale-0 h-0"}`}>
            {props.expanded ? (props.count < 1000 ? props.count : "+999") : props.count < 100 ? props.count : "+99"}
        </p>);
}
