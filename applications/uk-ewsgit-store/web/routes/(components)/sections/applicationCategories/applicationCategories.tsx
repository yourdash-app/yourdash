/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Row from "@yourdash/chiplet/components/row/Row.tsx";
import useResource from "@yourdash/csi/useResource.ts";
import { Card, Heading } from "@yourdash/uikit/components/index";
import React from "react";
import { acsi } from "../../../../meta.yourdash.ts";
import styles from "./applicationCategories.module.scss";
import { UKC } from "@yourdash/uikit";

const ApplicationCategories: React.FC = () => {
  const categories = useResource(() => acsi.getJson("/home/applicationCategories", "/home/applicationCategories")) || [];

  return (
    <div className={styles.component}>
      {categories.map((cat) => {
        return (
          <Card
            key={cat.id}
            style={{ backgroundImage: cat.backgroundImage }}
          >
            <Heading text={cat.displayName} />
            <UKText text={cat.description} />
            <Row>
              <UKText text={cat.applicationCount.toString()} />
              <UKText text={cat.moduleCount.toString()} />
            </Row>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationCategories;
