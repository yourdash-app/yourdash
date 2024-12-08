/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.ts";
import Button from "../button/button.tsx";
import { useNavigate } from "react-router";
import styles from "./buttonLink.module.scss";
import { FC } from "react";

const ButtonLink: FC<{ text: string; to: string; className?: string }> = (props) => {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate(props.to);
        return 0;
      }}
      text={props.text}
      className={clippy(styles.component, props.className)}
    />
  );
};

export default ButtonLink;
