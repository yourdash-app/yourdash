/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */


import "./globals.css";
import type {AppProps} from "next/app";
import setTheme from "./../lib/setTheme";
import Head from "next/head";
import React, {useEffect, useState} from "react";

function NEXT_APP({Component, pageProps}: AppProps) {
    // set theme colors
    if (typeof window !== "undefined") {
        if (!window.document.body.style.getPropertyValue("--devdash-setTheme")) setTheme();
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                setTheme();
            });
    }

    const [Errors, setErrors] = useState([] as any[]);

    useEffect(() => {
        window.addEventListener("error", (e) => {
            if (window.location.hostname !== "localhost") {
                e.preventDefault();
                setErrors([...Errors, e]);
            }
        })
    })
    return (<React.StrictMode>
        <Head>
            <link
                rel="shortcut icon"
                href={require("./../assets/icons/DevDashAlt.svg").default.src}
                type="image/x-icon"
            />
        </Head>
        <div
            className={`fixed z-50 bottom-0 text-xl right-0 p-2 bg-content-normal backdrop-blur-lg text-text-primary rounded-tl-2xl pointer-events-none border-4 border-branding-primary`}>PreAlpha
        </div>
        <div
            className={`w-max h-max fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col bg-content-dark shadow-2xl rounded-2xl ${Errors.length > 0 ? "p-5" : "hidden"} text-red-500 font-extrabold max-h-[90vh] max-w-[90vw] overflow-scroll m-2`}>
            {Errors.length > 0 ?
                <button className={`cursor-pointer bg-content-light text-text-primary rounded-md`} onClick={() => {
                    setErrors([]);
                }}>Dismiss</button>
                : null}
            {Errors.map((e, i) => {
                return <span key={i}>{e.message}</span>
            })}
        </div>
        <Component {...pageProps} />
    </React.StrictMode>);
}

export default NEXT_APP;