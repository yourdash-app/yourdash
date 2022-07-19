/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */
import React from "react";
import Sidebar from "../../components/app/settings/Sidebar";
import {useRouter} from "next/router";
import Header from "./../../components/app/settings/Header";
import {StringSetting, ToggleSetting} from "../../components/app/settings/Settings";
import localforage from "localforage";
import Head from "next/head";

export default class Settings extends React.Component<{ path: string }> {
    state: {
        settingsData: any;
        loaded: boolean;
    } = {
        settingsData: {},
        loaded: false,
    };

    componentDidMount() {
        localforage.getItem("settings").then((settings) => {
            if (settings) {
                this.setState({settingsData: settings, loaded: true});
                this.forceUpdate();
                return;
            } else {
                localforage.setItem("settings", {});
                this.setState({settingsData: {}, loaded: true});
                this.forceUpdate();
                return;
            }
        });
    }

    render() {
        if (!this.state.loaded) {
            return <></>;
        }
        switch (this.props.path) {
            case "test":
                let a = false;
                return (
                    <>
                        <Head>
                            <title>DevDash | Settings - Test</title>
                        </Head>
                        <div className={`flex w-full dark:bg-bg-dark-primary bg-bg-light-primary`}>
                            <Sidebar page={"test"}/>
                            <div className={`flex flex-col w-full`}>
                                <Header title={"Test"}/>
                                <div className={`mr-5 ml-5`}>
                                    <ToggleSetting
                                        settingsData={this.state.settingsData}
                                        description={"Test"}
                                        settingsKey={`test`}
                                        defaultValue={false}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                );
            default:
                return (
                    <>
                        <Head>
                            <title>DevDash | Settings - Overview</title>
                        </Head>
                        <div className={`flex w-full dark:bg-bg-dark-primary bg-bg-light-primary`}>
                            <Sidebar page={"overview"}/>
                            <div className={`flex flex-col w-full`}>
                                <Header title={`Overview`}/>
                                <div className={`mr-5 ml-5`}>
                                    <ToggleSetting
                                        description={"Collapse navigation bar"}
                                        settingsKey={`collapseNavigationBar`}
                                        defaultValue={false}
                                        settingsData={this.state.settingsData}
                                    />
                                    <ToggleSetting
                                        disabled
                                        description={"Enable High-Contrast Mode"}
                                        settingsKey={`isHightContrast`}
                                        defaultValue={false}
                                        settingsData={this.state.settingsData}
                                    />
                                    <StringSetting
                                        description={"Test String"}
                                        settingsKey={`testString`}
                                        defaultValue={"Hello World"}
                                        settingsData={this.state.settingsData}
                                    />
                                    <ApplySettings/>
                                </div>
                            </div>
                        </div>
                    </>
                );
        }
    }
}

function ApplySettings() {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                router.reload();
            }}
            className={`w-full bg-content-normal rounded-lg p-2 text-text-primary text-xl hover:bg-content-light active:bg-content-dark transition-all`}
        >
            Apply
        </button>
    );
}
