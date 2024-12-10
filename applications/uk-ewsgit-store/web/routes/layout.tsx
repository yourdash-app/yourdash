import { Button } from "@yourdash/uikit/components/index";
import { NavBar, NavImage, NavTitle, Sidebar, SidebarContainer, SidebarToggleButton } from "@yourdash/uikit/views/index";
import React from "react";
import { Outlet } from "react-router-dom";
import { useNavigateTo } from "../meta.yourdash";
import STORE_ICON from "../../icon.avif";
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
