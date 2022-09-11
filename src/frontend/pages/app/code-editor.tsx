/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React from "react";
import EditorLayout from "../../components/app/code-editor/EditorLayout";
import Head from "next/head";

export default function CodeEditor() {
    return (
        <div className={`w-full h-screen`}>
            <Head>
                <title>DevDash | Code Editor</title>
            </Head>
            <EditorLayout/>
        </div>
    );
}
