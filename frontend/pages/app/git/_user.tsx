/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React from "react"
import {useRouter} from "next/router";

export default function _user() {
    const router = useRouter()
    // @ts-ignore
    return <h1>{router.query?.path[2]}</h1>;
}