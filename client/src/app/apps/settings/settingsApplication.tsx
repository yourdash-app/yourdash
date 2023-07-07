import React from "react";
import {Card, Column} from "../../../ui";
import csi from "../../../helpers/csi";
import Panel from "../../Panel/Panel";
import SettingsSectionPanelPosition from "./sections/SettingsSectionPanelPosition";
import SettingsPageSession from "./pages/session";
import SettingCategoryComponent from "./components/SettingCategoryComponent";
import BasePageLayout from "./components/BasePageLayout";

const SettingsApplication: React.FC = () => (
  <BasePageLayout
    noBack
    title={"Home"}
  >
    <SettingCategoryComponent
      href={"/app/a/settings/personalization"}
      description={"Sample text"}
      title={"Personalization"}
      icon={"paintbrush-16"}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/session"}
      description={"Sample text"}
      title={"Login sessions"}
      icon={"login"}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/accessibility"}
      description={"Sample text"}
      title={"Accessibility"}
      icon={"accessibility-16"}
    />
    <SettingCategoryComponent
      href={"/app/a/settings/admin"}
      description={"Sample text"}
      title={"Admin tools"}
      icon={"tools-16"}
    />
    <div className={"h-full overflow-auto"}>
      <main className={"ml-auto mr-auto w-full max-w-5xl"}>
        <SettingsSectionPanelPosition/>
        <section className={"p-4"}>
          {/* TODO: improve the design of the position button icons */}
          <div
            className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 min-h-32"}
          >
            <Card
              className={"flex flex-col transition-[var(--transition)] h-full"}
              onClick={() => {
                csi.postJson(
                  "/app/settings/core/panel/quick-shortcuts",
                  {launcher: 0},
                  () => {
                    // @ts-ignore
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={"/assets/productLogos/yourdash.svg"}
                alt={""}
                className={"p-4 h-full"}
                draggable={false}
              />
              <span className={"text-xl"}>Pop out</span>
            </Card>
            <Card
              className={"flex flex-col transition-[var(--transition)] h-full"}
              onClick={() => {
                csi.postJson(
                  "/app/settings/core/panel/quick-shortcuts",
                  {launcher: 1},
                  () => {
                    // @ts-ignoret
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={"/assets/productLogos/yourdash.svg"}
                alt={""}
                className={"p-4 h-full"}
                draggable={false}
              />
              <span className={"text-xl"}>Slide out</span>
            </Card>
          </div>
        </section>
      </main>
    </div>
  </BasePageLayout>
);

export default SettingsApplication;
