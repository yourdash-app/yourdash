/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy.js";
import Button from "../button/button.js";
import { Link } from "react-router-dom";
import styles from "./buttonLink.module.scss";
import { FC } from "react";

const ButtonLink: FC<{ text: string; to: string; className?: string }> = (props) => {
  return (
    <Link
      to={props.to}
      className={styles.link}
    >
      <Button
        onClick={() => {
          return 0;
        }}
        text={props.text}
        className={clippy(styles.component, props.className)}
      />
    </Link>
  );
};

export default ButtonLink;
