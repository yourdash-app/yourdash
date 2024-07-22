/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import { useNavigate } from "react-router";
import csi from "@yourdash/csi/csi";
import styles from "./Widget.module.scss";
import { memo, useEffect, useState } from "react";

const InstanceLogoWidget: React.FC = () => {
  const navigate = useNavigate();
  const [icons, setIcons] = useState<{ small: string; medium: string; large: string }>({
    small: "",
    medium: "",
    large: "",
  });

  useEffect(() => {
    csi.syncGetJson("/core/panel/logo", (data) => {
      setIcons(data);
    });
  }, []);

  return (
    <img
      src={`${csi.getInstanceUrl()}${icons.large}`}
      alt={"Instance logo"}
      draggable={false}
      className={styles.icon}
      onClick={() => {
        navigate("/app/a/uk-ewsgit-dash");
      }}
    />
  );
};

export default memo(InstanceLogoWidget);
