/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import React from "react";
import { useRouteError } from "react-router-dom";
import styles from "./ErrorElement.module.scss";
import { UKC } from "@yourdash/uikit";

const ErrorElement: React.FC = () => {
  // @ts-ignore
  const error = (useRouteError()?.error as Error) || ({} as Partial<Error>);

  return (
    <div className={styles.page}>
      <UKC.Card containerClassName={styles.error}>
        <UKC.Heading
          level={1}
          text={"An error has occurred"}
        />
        {error.message && (
          <UKC.Heading
            level={3}
            text={error.message}
          />
        )}
        {error.stack && <UKC.Text text={error.stack} />}
      </UKC.Card>
    </div>
  );
};

export default ErrorElement;
