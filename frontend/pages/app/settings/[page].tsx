/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */
import React from "react";
import { NextRouter, withRouter, useRouter } from "next/router";
import Header from "./../../../components/app/settings/Header";
import { StringSetting, ToggleSetting } from "../../../components/app/settings/SettingComponents";
import localforage from "localforage";
import Head from "next/head"

class Settings extends React.Component<{ router: NextRouter }> {
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
        this.setState({ settingsData: settings, loaded: true });
        this.forceUpdate();
        return;
      } else {
        localforage.setItem("settings", {});
        this.setState({ settingsData: {}, loaded: true });
        this.forceUpdate();
        return;
      }
    });
  }

  render() {
    if (!this.state.loaded) {
      return <></>;
    }
    switch (this.props.router.query?.page) {
      case "test":
        return (
          <>
            <Head>
              <title>DevDash | Settings - Test</title>
            </Head>
            <div className={`flex w-full dark:bg-bg-dark-primary bg-bg-light-primary`}>
              <div className={`flex flex-col w-full`}>
                <Header title={"Test"} />
                <div className={`mr-5 ml-5`}>
                  <ToggleSetting
                    settingsData={this.state.settingsData}
                    description={"Test"}
                    settingsKey={`test`}
                    defaultValue={false}
                  />
                  <ApplySettings />
                </div>
              </div>
            </div>
          </>
        );
      case "code-editor":
        return (
          <>
            <Head>
              <title>DevDash | Settings - Code Editor</title>
            </Head>
            <div className={`flex w-full dark:bg-bg-dark-primary bg-bg-light-primary`}>
              <div className={`flex flex-col w-full`}>
                <Header title={"Test"} />
                <div className={`mr-16 ml-16 grid`}>
                  <ToggleSetting
                    settingsData={this.state.settingsData}
                    description={"Test"}
                    settingsKey={`test`}
                    defaultValue={false}
                  />
                  <ApplySettings />
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
              <div className={`flex flex-col w-full`}>
                <Header title={`Overview`} />
                <div className="lg:mr-16 lg:ml-16 sm:ml-8 sm:mr-8 ml-2 mr-2 flex flex-col justify-center content-center transition-all">
                  <div className={`flex flex-col md:grid grid-cols-[1fr,1fr] child:mb-2 w-full`}>
                    <ToggleSetting
                      description={"Collapse navigation bar"}
                      settingsKey={`collapseNavigationBar`}
                      defaultValue={false}
                      settingsData={this.state.settingsData}
                    />
                    <ToggleSetting
                      disabled
                      description={"Enable high-contrast mode"}
                      settingsKey={`isHightContrast`}
                      defaultValue={false}
                      settingsData={this.state.settingsData}
                    />
                    <StringSetting
                      description={"Test string"}
                      settingsKey={`testString`}
                      defaultValue={"Hello World"}
                      settingsData={this.state.settingsData}
                    />
                    <ToggleSetting
                      description={"Enable right-aligned navigation bar"}
                      settingsKey={`isNavigationBarRightAligned`}
                      defaultValue={false}
                      settingsData={this.state.settingsData}
                    />
                  </div>
                  <ApplySettings />
                </div>
              </div>
            </div>
          </>
        );
    }
  }
}

export default withRouter(Settings)

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
