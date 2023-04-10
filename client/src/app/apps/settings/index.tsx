import React from "react";
import { Card } from "../../../ui/index";
import { postJson } from "../../../helpers/fetch";
import Panel from "../../Panel/Panel";

const SettingsApplication: React.FC = () => {
  return (
    <div className={`h-full overflow-auto`}>
      <h1
        className={`font-bold text-container-fg text-4xl tracking-wide pb-4 pt-4 pl-6 pr-6 bg-container-bg`}
      >
        YourDash Settings
      </h1>
      <main className={`ml-auto mr-auto w-full max-w-5xl`}>
        <section className={`p-4`}>
          {/* TODO: add icons to the buttons ( left, top, right, bottom ) */}
          <h2
            className={`text-container-fg font-semibold text-3xl w-min whitespace-nowrap pb-4`}
          >
            Panel position
          </h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-2 min-h-32`}
          >
            <Card
              className={`flex flex-col transition-[var(--transition)] h-full`}
              onClick={() => {
                postJson(
                  `/app/settings/panel/position`,
                  { position: 0 },
                  () => {
                    // @ts-ignore
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={`/assets/settings/panel_left.svg`}
                alt={``}
                className={`p-4 h-full`}
                draggable={false}
              />
              <span className={`text-xl`}>Left</span>
            </Card>
            <Card
              className={`flex flex-col transition-[var(--transition)] h-full`}
              onClick={() => {
                postJson(
                  `/app/settings/panel/position`,
                  { position: 1 },
                  () => {
                    // @ts-ignoret
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={`/assets/settings/panel_top.svg`}
                alt={``}
                className={`p-4 h-full`}
                draggable={false}
              />
              <span className={`text-xl`}>Top</span>
            </Card>
            <Card
              className={`flex flex-col transition-[var(--transition)] h-full`}
              onClick={() => {
                postJson(
                  `/app/settings/panel/position`,
                  { position: 2 },
                  () => {
                    // @ts-ignore
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={`/assets/settings/panel_right.svg`}
                alt={``}
                className={`p-4 h-full`}
                draggable={false}
              />
              <span className={`text-xl`}>Right</span>
            </Card>
            <Card
              className={`flex flex-col transition-[var(--transition)] h-full`}
              onClick={() => {
                postJson(
                  `/app/settings/panel/position`,
                  { position: 3 },
                  () => {
                    // @ts-ignore
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={`/assets/settings/panel_bottom.svg`}
                alt={``}
                className={`p-4 h-full`}
                draggable={false}
              />
              <span className={`text-xl`}>Bottom</span>
            </Card>
          </div>
        </section>
        <section className={`p-4`}>
          {/* TODO: add icons to the buttons ( left, top, right, bottom ) */}
          <h2
            className={`text-container-fg font-semibold text-3xl w-min whitespace-nowrap pb-4`}
          >
            Panel Launcher
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 min-h-32`}
          >
            <Card
              className={`flex flex-col transition-[var(--transition)] h-full`}
              onClick={() => {
                postJson(
                  `/app/settings/panel/launcher`,
                  { launcher: 0 },
                  () => {
                    // @ts-ignore
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={`/assets/productLogos/yourdash.svg`}
                alt={``}
                className={`p-4 h-full`}
                draggable={false}
              />
              <span className={`text-xl`}>Pop out</span>
            </Card>
            <Card
              className={`flex flex-col transition-[var(--transition)] h-full`}
              onClick={() => {
                postJson(
                  `/app/settings/panel/launcher`,
                  { launcher: 1 },
                  () => {
                    // @ts-ignoret
                    Panel.reload();
                  }
                );
              }}
            >
              <img
                src={`/assets/productLogos/yourdash.svg`}
                alt={``}
                className={`p-4 h-full`}
                draggable={false}
              />
              <span className={`text-xl`}>Slide out</span>
            </Card>
          </div>
        </section>
        <section className={`p-4`}>
          {/* TODO: add icons to the buttons ( left, top, right, bottom ) */}
          <h2
            className={`text-container-fg font-semibold text-3xl w-min whitespace-nowrap pb-4`}
          >
            Panel Quick Shortcuts
          </h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-2 min-h-32`}
          >
            <Card compact={true}>a</Card>
            <Card compact={true}>a</Card>
            <Card compact={true}>a</Card>
            <Card compact={true}>a</Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsApplication;
