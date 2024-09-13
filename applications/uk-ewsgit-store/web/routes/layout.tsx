import React from "react";
import { Outlet } from "react-router-dom";
import SidebarContainer from "@yourdash/uikit/views/sidebar/SidebarContainer";
import Sidebar from "@yourdash/uikit/views/sidebar/Sidebar";
import Button from "@yourdash/uikit/components/button/button";
import { useNavigateTo } from "../meta.yourdash";
import NavBar from "@yourdash/uikit/views/navBar/navBar";
import STORE_ICON from "../../icon.avif";
import NavImage from "@yourdash/uikit/views/navBar/components/navImage/navImage";
import NavTitle from "@yourdash/uikit/views/navBar/components/navTitle/navTitle";
import SidebarToggleButton from "@yourdash/uikit/views/sidebar/SidebarToggleButton";
import styles from "./layout.module.scss";

const ApplicationLayout: React.FC = () => {
  const navigateTo = useNavigateTo();

  return (
    <>
      <SidebarContainer className={styles.sidebarContainer}>
        <NavBar
          leftSection={
            <>
              <SidebarToggleButton />
              <NavImage src={STORE_ICON} />
              <NavTitle title={"YourDash Store"} />
            </>
          }
        />
        <div className={styles.content}>
          <Sidebar>
            <Button
              text={"Home"}
              onClick={() => {
                navigateTo("/");
              }}
            />
            <Button
              text={"Search"}
              onClick={() => {
                navigateTo("/search");
              }}
            />
            <Button
              text={"Applications"}
              onClick={() => {
                navigateTo("/applications");
              }}
            />
            <Button
              text={"Modules"}
              onClick={() => {
                navigateTo("/modules");
              }}
            />
            <Button
              text={"Manage Installed"}
              onClick={() => {
                navigateTo("/manage");
              }}
            />
          </Sidebar>
          <Outlet />
        </div>
      </SidebarContainer>
    </>
  );
};

export default ApplicationLayout;
