/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Index from "./git/_index";
import Favourites from "./git/_favourites";
import Feed from "./git/_feed";
import User from "./git/_user";

export default function Git() {
    const router = useRouter();
    useEffect(() => {
        if (!router.query.path) {
            router.push("/app/home");
        }
    })
    // @ts-ignore
    switch (router.query?.path?.[1]) {
        case "u":
        case "user":
            // user
            return <User/>
        case "feed":
            // logged in user's feed
            return <Feed/>
        case "favourites":
            // logged in user's favourites
            return <Favourites/>
        default:
            return <Index/>
    }
}
