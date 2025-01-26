/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { UKIcon } from "@yourdash/chiplet/components/icon/iconDictionary";
import IconButton from "@yourdash/chiplet/components/iconButton/IconButton";
import React from "react";
import { modulePath } from "../../../meta.yourdash";
import styles from "./BrowserLayout.module.scss";
import { useNavigate } from "react-router-dom";

export interface IBrowserLayout {
  username: string;
  fullName: {
    first: string;
    last: string;
  };
}

const BrowserLayout: React.FC<IBrowserLayout> = ({ username, fullName }) => {
  const navigate = useNavigate();
  return (
    <div className={"flex items-center justify-center flex-col h-full w-full bg-center bg-cover gap-4"}>
      <IconButton
        className={"fixed top-4 right-4"}
        icon={UKIcon.Gear}
        onClick={() => {
          navigate(`${modulePath}/personalization/dashboard`);
        }}
      />
      <div
        className={
          "font-black text-container-fg 2xl:text-8xl xl:text-7xl lg:text-6xl md:text-5xl sm:text-4xl text-3xl translate-all animate__animated animate__fadeInUp [filter:_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))_drop-shadow(0_10px_8px_rgb(0_0_0/0.04))_drop-shadow(0_4px_3px_rgb(0_0_0/0.1))] backdrop-blur-md bg-container-bg bg-opacity-75 p-4 pl-6 pr-6 rounded-3xl"
        }
      >
        {`LOCALIZED_GREETING ${fullName.first} ${fullName.last}`}
      </div>
      <section className={styles.content}>
        <section className={"h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-48"} />
        <section className={"h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-64"} />
        <section className={"h-64 bg-container-bg rounded-3xl bg-opacity-90 backdrop-blur-xl w-48"} />
      </section>
    </div>
  );
};

export default BrowserLayout;
