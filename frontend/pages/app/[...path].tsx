/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.
 *   Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import {useRouter} from "next/router";
import React, {useEffect} from "react";

import CodeEditor from "./_code-editor";
import Index from "./_index";
import Settings from "./_settings";
import Git from "./_git";
import localforage from "localforage";
import PageContainer from "../../components/app/PageContainer";
import UnderConstruction from "./_under-construction";
import Notifications from "./_notifications";

// the code below is a custom router for /app/*
// it might seem unnecessary, but it's required to stop re-rendering the navigation bar
// when navigating to a different page (there is probably a better way to do this)

export default function AppRouting() {
    let isAuthorizedUser = false;
    useEffect(() => {
        localforage.getItem("githubUser").then(user => {
            if (user) {
                isAuthorizedUser = true; // eslint-disable-line
            }
        });
    }, []);
    const router: any = useRouter();
    if (!router.query.path) return <></>
    switch (router.query.path[0]) {
        case "home":
            return (<PageContainer pageId={"home"}>
                <Index/>
            </PageContainer>);
        case "code-editor":
            return (<PageContainer pageId={"code-editor"}>
                <CodeEditor/>
            </PageContainer>);
        case "git":
            return (<PageContainer pageId={"git"}>
                <Git/>
            </PageContainer>);
        case "manage-server":
            return (<PageContainer pageId={"manage-server"}>
                <UnderConstruction/>
            </PageContainer>)
        case "settings":
            return (<PageContainer pageId={"settings"}>
                <Settings path={router.query.path[1]}/>
            </PageContainer>);
        case "notifications":
            return (<PageContainer pageId={"notifications"}>
                <Notifications/>
            </PageContainer>);
        case "todo":
            return (<PageContainer pageId={"todo"}>
                <UnderConstruction/>
            </PageContainer>)
        default:
            router.push("/app/home/");
    }
}
