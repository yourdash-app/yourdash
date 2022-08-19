/*
 *   Copyright (c) 2022 Ewsgit
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import "./globals.css";
import type { AppProps } from "next/app";
import setTheme from "./../lib/setTheme";
import Head from "next/head";
import React, { useEffect, useState } from "react";

function NEXT_APP({ Component, pageProps }: AppProps) {
    // set theme colors
    if (typeof window !== "undefined") {
        if (!window.document.body.style.getPropertyValue("--devdash-setTheme")) setTheme();
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                setTheme();
            });
    }

    const [ Errors, setErrors ] = useState([] as any[]);
    const [ isDesktop, setIsDesktop ] = useState(false)
    const [ latestBuildId, setLatestBuildId ] = useState("Internal Error")

    useEffect(() => {
        window.addEventListener("error", (e) => {
            if (window.location.hostname !== "localhost") {
                e.preventDefault();
                setErrors([ ...Errors, e ]);
            }
        })
        // get the lastest github
        // if (sessionStorage.getItem("github_commit_id")) {
        //     setLatestBuildId(sessionStorage.getItem("github_commit_id") as string)
        // } else {
        //     console.log("fetched github lastest build id!")
        //     fetch("https://api.github.com/repos/ewsgit/devdash/commits/main")
        //         .then(res => res.json())
        //         .then(res => {
        //             setLatestBuildId(res.sha)
        //             sessionStorage.setItem("github_commit_id", res.sha)
        //         })
        // }
        if (localStorage.getItem("is_desktop") === "true") {
            setIsDesktop(true)
        }
    }, [])
    return (<React.StrictMode>
        <Head>
            <link
                rel="shortcut icon"
                href={require("./../assets/icons/DevDash.svg").default.src}
                type="image/x-icon"
            />
        </Head>
        {
            !isDesktop ?
                <div
                    className={`fixed z-50 top-0 text-xl left-1/2 pl-2 pr-2 bg-content-light text-text-secondary rounded-b-xl pointer-events-none border-4 border-branding-primary border-t-0 -translate-x-1/2`}>DevDash Rolling [{latestBuildId}]
                </div>
                : null
        }
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