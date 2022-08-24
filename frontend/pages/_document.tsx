/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

import React from "react";
import {Head, Html, Main, NextScript} from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="google-site-verification" content="7cX4pphIkO6E0BneERfoBUoG9q9noi3z-1e8G6XZ3BI"/>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="apple-touch-icon" href="/DevDash@2x.png"/>
                <meta name="apple-mobile-web-app-status-bar" content="#363636" />
                <link rel="shortcut icon" href="/DevDash.png" type="image/x-icon" />
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
