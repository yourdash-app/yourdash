import React from "react";
import {Outlet, useNavigate} from "react-router-dom";
import {SideBar} from "../../../ui";

const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className={"grid grid-cols-1 grid-rows-[auto,1fr] md:grid-rows-none md:grid-cols-[auto,1fr] h-full w-full"}>
      <SideBar
        title={"Settings"}
        items={[
          {
            icon: "home-16",
            label: "Home",
            onClick() {
              navigate("/app/a/settings/");
            }
          },
          {
            icon: "paintbrush-16",
            label: "Personalization",
            onClick() {
              navigate("/app/a/settings/personalization");
            }
          },
          {
            icon: "login",
            label: "Login sessions",
            onClick() {
              navigate("/app/a/settings/session");
            }
          },
          {
            icon: "accessibility-16",
            label: "Accessibility",
            onClick() {
              navigate("/app/a/settings/accessibility");
            }
          },
          {
            icon: "tools-16",
            label: "Admin tools",
            onClick() {
              navigate("/app/a/settings/admin");
            }
          },
          {
            icon: "code-16",
            label: "Developer tools",
            onClick() {
              navigate("/app/a/settings/developer");
            }
          }
        ]}
      />
      <Outlet/>
    </main>
  );
};

export default SettingsLayout;
