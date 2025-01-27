import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigateTo } from "../meta.yourdash";
import STORE_ICON from "../../icon.avif";
import styles from "./layout.module.scss";
import UKNavImage from "@yourdash/uikit/src/views/navBar/components/navImage/UKNavbarNavImage.js";
import UKNavTitle from "@yourdash/uikit/src/views/navBar/components/navTitle/UKNavbarNavTitle.js";
import UKNavBar from "@yourdash/uikit/src/views/navBar/UKNavBar.js";
import UKButton from "@yourdash/uikit/src/components/button/UKButton.js";
import UKSidebar from "@yourdash/uikit/src/views/sidebar/UKSidebar.js";
import UKSidebarContainer from "@yourdash/uikit/src/views/sidebar/UKSidebarContainer.js";
import UKSidebarToggleButton from "@yourdash/uikit/src/views/sidebar/UKSidebarToggleButton.js";

const ApplicationLayout: React.FC = () => {
  const navigateTo = useNavigateTo();

  return (
    <>
      <UKSidebarContainer className={styles.sidebarContainer}>
        <UKNavBar
          leftSection={
            <>
              <UKSidebarToggleButton />
              <UKNavImage src={STORE_ICON} />
              <UKNavTitle title={"YourDash Store"} />
            </>
          }
        />
        <div className={styles.content}>
          <UKSidebar>
            <UKButton
              text={"Home"}
              onClick={() => {
                navigateTo("/");
              }}
            />
            <UKButton
              text={"Search"}
              onClick={() => {
                navigateTo("/search");
              }}
            />
            <UKButton
              text={"Applications"}
              onClick={() => {
                navigateTo("/applications");
              }}
            />
            <UKButton
              text={"Modules"}
              onClick={() => {
                navigateTo("/modules");
              }}
            />
            <UKButton
              text={"Manage Installed"}
              onClick={() => {
                navigateTo("/manage");
              }}
            />
          </UKSidebar>
          <Outlet />
        </div>
      </UKSidebarContainer>
    </>
  );
};

export default ApplicationLayout;
