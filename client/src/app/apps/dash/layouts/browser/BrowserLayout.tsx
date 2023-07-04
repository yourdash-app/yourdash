import React from "react";
import useTranslate from "../../../../../helpers/l10n";

export interface IBrowserLayout {
  username: string,
  fullName: {
    first: string,
    last: string
  }
}

const BrowserLayout: React.FC<IBrowserLayout> = ({
  username,
  fullName
}) => {
  const trans = useTranslate("dash");
  return (
    <div
      style={{
        backgroundImage: `url(${ localStorage.getItem(
          "current_server"
        ) }/core/login/background)`
      }}
      className={
        "flex items-center justify-center flex-col h-full w-full bg-center bg-cover gap-4"
      }
    >
      <div
        className={
          "font-black text-container-fg 2xl:text-8xl xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl translate-all animate__animated animate__fadeInUp [filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))] backdrop-blur-md bg-container-bg bg-opacity-75 p-4 pl-6 pr-6 rounded-3xl"
        }
      >
        {trans("LOCALIZED_GREETING", [fullName.first, fullName.last])}
      </div>
      <section
        className={
          "flex flex-wrap w-full max-w-[90rem] gap-2 animate__animated animate__fadeInUp pl-4 pr-4 items-center"
        }
      >
        <section
          className={
            "h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-48"
          }
        />
        <section
          className={
            "h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-64"
          }
        />
        <section
          className={
            "h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-48"
          }
        />
      </section>
    </div>
  );
};

export default BrowserLayout;
