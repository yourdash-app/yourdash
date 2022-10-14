/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React from "react"

export default function PillButton(props: { title: string, onClick: () => void; toggled: boolean; }) {
    return <button
        className={`rounded-full ${props.toggled ? "outline-3 outline outline-branding-primary" : null} p-1 pl-4 pr-4 bg-content-normal hover:bg-content-light active:bg-content-dark select-none text-text-secondary text-lg transition-colors shadow-md ml-1 mr-1`}>
        {props.title}
    </button>
}