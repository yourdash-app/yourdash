/*
 * Copyright ©2025 Ewsgit<https://ewsgit.uk> and YourDash<https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import toAuthImgUrl from "@yourdash/csi/toAuthImgUrl.ts";
import Image from "@yourdash/uikit/src/components/image/image.js";
import { Card } from "@yourdash/uikit/src/components/index";
import { PanAndZoom } from "@yourdash/uikit/src/views/index";
import { FC, useState } from "react";
import styles from "./viewImage.module.scss";

const ViewImage: FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  const [scale, setScale] = useState(1);

  return (
    <>
      <PanAndZoom onScaleChange={(s) => setScale(s)}>
        <Image
          className={styles.viewImage}
          src={toAuthImgUrl(mediaUrl)}
          accessibleLabel={""}
        />
        <Card className={styles.scale}>
          <UKText text={`${scale * 100}% scale`} />
        </Card>
      </PanAndZoom>
    </>
  );
};

export default ViewImage;
