/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import UKButton from "../button/UKButton.tsx";
import { useNavigate } from "react-router";
import styles from "./buttonLink.module.scss";
import { FC } from "react";

const UKButtonLink: FC<{ text: string; to: string; className?: string }> = (props) => {
  const navigate = useNavigate();

  return (
    <UKButton
      onClick={() => {
        navigate(props.to);
        return 0;
      }}
      text={props.text}
      className={clippy(styles.component, props.className)}
    />
  );
};

export default UKButtonLink;
