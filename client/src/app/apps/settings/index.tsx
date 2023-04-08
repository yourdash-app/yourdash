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
      <section className={`p-4`}>
        {/* TODO: add icons to the buttons ( left, top, right, bottom ) */}
        <h2 className={`text-container-fg font-semibold text-3xl`}>
          Panel position
        </h2>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full p-4 gap-2 max-w-5xl`}
        >
          <Card
            className={`flex flex-col lg:aspect-square transition-[var(--transition)] aspect-[2/1]`}
            onClick={() => {
              postJson(`/panel/position`, { position: 0 }, () => {
                // @ts-ignore
                Panel.reload();
              });
            }}
          >
            <img
              src={`/assets/settings/panel_left.svg`}
              alt={``}
              className={`w-full p-4`}
              draggable={false}
            />
            <span className={`text-xl`}>Left</span>
          </Card>
          <Card
            className={`flex flex-col lg:aspect-square transition-[var(--transition)] aspect-[2/1]`}
            onClick={() => {
              postJson(`/panel/position`, { position: 1 }, () => {
                // @ts-ignore
                Panel.reload();
              });
            }}
          >
            <img
              src={`/assets/settings/panel_top.svg`}
              alt={``}
              className={`w-full p-4`}
              draggable={false}
            />
            <span className={`text-xl`}>Top</span>
          </Card>
          <Card
            className={`flex flex-col lg:aspect-square transition-[var(--transition)] aspect-[2/1]`}
            onClick={() => {
              postJson(`/panel/position`, { position: 2 }, () => {
                // @ts-ignore
                Panel.reload();
              });
            }}
          >
            <img
              src={`/assets/settings/panel_right.svg`}
              alt={``}
              className={`w-full p-4`}
              draggable={false}
            />
            <span className={`text-xl`}>Right</span>
          </Card>
          <Card
            className={`flex flex-col lg:aspect-square transition-[var(--transition)] aspect-[2/1]`}
            onClick={() => {
              postJson(`/panel/position`, { position: 3 }, () => {
                // @ts-ignore
                Panel.reload();
              });
            }}
          >
            <img
              src={`/assets/settings/panel_bottom.svg`}
              alt={``}
              className={`w-full p-4`}
              draggable={false}
            />
            <span className={`text-xl`}>Bottom</span>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SettingsApplication;
