/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/src/components/card/card.js";
import React from "react";
import { useNavigate } from "react-router-dom";
import coreCSI from "@yourdash/csi/coreCSI";
import styles from "./StoreApplication.module.scss";

export interface IStoreApplicationComponent {
  displayName: string;
  id: string;
  icon: string;
}

const StoreApplication: React.FC<IStoreApplicationComponent> = ({ displayName, id, icon }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/app/a/uk-ewsgit-store/app/${id}`)}
      className={styles.component}
    >
      <img
        loading={"lazy"}
        src={`${coreCSI.getInstanceUrl()}${icon}`}
        className={"aspect-square h-16"}
        alt={""}
      />
      <div className={styles.section}>
        <span className={styles.label}>{displayName}</span>
      </div>
    </Card>
  );
};

export default StoreApplication;
