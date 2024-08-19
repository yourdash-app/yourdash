import React from "react";
import { Outlet } from "react-router-dom";
import SidebarContainer from "@yourdash/uikit/views/sidebar/SidebarContainer"
import Sidebar from "@yourdash/uikit/views/sidebar/Sidebar"
import Heading from "@yourdash/uikit/components/heading/heading";

const ApplicationLayout: React.FC = () => {
    return <>
        <SidebarContainer>
            <Sidebar>
                <Heading text={"YourDash Store"} />
            </Sidebar>
            <Outlet />
        </SidebarContainer>
    </>
}

export default ApplicationLayout