/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import Card from "@yourdash/uikit/components/card/card";
import Image from "@yourdash/uikit/components/image/image";
import Text from "@yourdash/uikit/components/text/text";
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
        noRounding={true}
        className={styles.img}
        src={toAuthImgUrl(data.icon)}
        accessibleLabel={""}
      />
      <Text text={data.name} />
    </Card>
  );
};

export default Widget;
