/*
 * Copyright ©2024 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Card from "@yourdash/uikit/components/card/card";
import Image from "@yourdash/uikit/components/image/image";
import React from "react";
import { IApplicationShortcutWidget } from "../../../shared/types/widgets/applicationShortcut";
import styles from "./widget.module.scss";
import { useNavigate } from "react-router-dom";

const Widget: React.FC<{ data: IApplicationShortcutWidget["data"] }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Card
      className={styles.widget}
      onClick={() => {
        navigate(data.url);
      }}
    >
      <Image
        className={styles.img}
        src={data.icon}
        authenticatedImage={true}
        accessibleLabel={""}
      />
      <span>{data.name}</span>
    </Card>
  );
};

export default Widget;
