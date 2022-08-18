/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React from "react"
import Navigation from "./Navigation"

export default function PageContainer(props: { pageId: string, children: React.ReactChild | React.ReactChild[] }) {
    return <div className={`grid grid-cols-[auto,1fr] w-full min-h-full overflow-y-hidden overflow-x-hidden`}>
        <Navigation pageId={props.pageId} />
        {props.children}
    </div>
}
