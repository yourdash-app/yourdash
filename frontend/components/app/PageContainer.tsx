/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import localforage from "localforage"
import React, { useEffect, useState } from "react"
import Navigation from "./Navigation"

export default function PageContainer(props: { pageId: string, children: React.ReactChild | React.ReactChild[] }) {
  const [isRightAligned, setIsRightAligned] = useState(false)
  useEffect(() => {
    localforage.getItem("settings")
      .then((res: any) => {
        if (res === null) return
        if (res.isNavigationBarRightAligned === undefined) return
        setIsRightAligned(res.isNavigationBarRightAligned)
      })
  })
  return <div className={`grid ${isRightAligned ? "grid-cols-[1fr,auto]" : "grid-cols-[auto,1fr]"} w-full min-h-full overflow-y-hidden overflow-x-hidden`}>
    {
      isRightAligned
        ? <>{props.children}<Navigation pageId={props.pageId} /></>
        : <><Navigation pageId={props.pageId} />{props.children}</>
    }
  </div>
}
