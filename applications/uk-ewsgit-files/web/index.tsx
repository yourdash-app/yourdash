/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import {Routes, Route} from "react-router-dom"
import applicationMeta from "./meta.yourdash";
import OnBoarding from "@yourdash/uikit/views/onBoarding/onBoarding"

const FilesRouter: React.FC = () => <Routes>
    <Route element={<OnBoarding meta={applicationMeta} pages={[ {
        headerImage: "/assets/productLogos/yourdash.svg",
        header: "YourDash Files",
        subHeading: "Hello world",
        body: "This is some sample text",
        actions: [ {
            label: "Next page",
            changeTo: "next",
            onClick: () => {}
        }]
    } ]} />}>
        <Route index element={<h1>Page Content For YourDash Files's Index</h1>}
        />
    </Route>
</Routes>;

export default FilesRouter;
