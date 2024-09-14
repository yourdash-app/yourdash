/*
 * Copyright ©2024 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import Card from "@yourdash/uikit/components/card/card.tsx";
import Heading from "@yourdash/uikit/components/heading/heading.tsx";
import Text from "@yourdash/uikit/components/text/text.tsx";
import React from "react";
import { useRouteError } from "react-router-dom";
import styles from "./ErrorElement.module.scss";

const ErrorElement: React.FC = () => {
  // @ts-ignore
  const error = (useRouteError()?.error as Error) || ({} as Partial<Error>);

  return (
    <div className={styles.page}>
      <Card containerClassName={styles.error}>
        <Heading
          level={1}
          text={"An error has occurred"}
        />
        {error.message && (
          <Heading
            level={3}
            text={error.message}
          />
        )}
        {error.stack && <Text text={error.stack} />}
      </Card>
    </div>
  );
};

export default ErrorElement;
