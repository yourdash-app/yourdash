/*
 * Copyright © 2022 Ewsgit
 * All rights reserved.
 * Licensed under the MIT License - https://ewsgit.github.io/devdash/copyright
 */

export default function setTheme() {
    if (typeof window !== "undefined") {
        // if the user set the theme mode the themeMode localStorage.setItem("themeMode", "dark")
        // then the theme will be dark
        if (!localStorage.getItem("themeMode")) localStorage.setItem("themeMode", "system")
        if (localStorage.getItem("themeMode") === "dark") {
            document.body.classList.add("dark");
        } else if (localStorage.getItem("themeMode") === "light") {
            document.body.classList.remove("dark");
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
        window.document.body.style.setProperty("--devdash-setTheme", "true")
    }
}