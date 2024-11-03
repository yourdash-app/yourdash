/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import Row from "@yourdash/chiplet/components/row/Row.tsx";
import useResource from "@yourdash/csi/useResource.ts";
import Card from "@yourdash/uikit/src/components/card/card.tsx";
import Heading from "@yourdash/uikit/src/components/heading/heading.tsx";
import Text from "@yourdash/uikit/src/components/text/text.tsx";
import React from "react";
import EndpointHomeApplicationCategories from "../../../../../shared/types/endpoints/home/applicationCategories.ts";
import { acsi } from "../../../../meta.yourdash.ts";
import styles from "./applicationCategories.module.scss";

const ApplicationCategories: React.FC = () => {
  const categories = useResource(() => acsi.getJson<EndpointHomeApplicationCategories>("/home/applicationCategories")) || [];

  return (
    <div className={styles.component}>
      {categories.map((cat) => {
        return (
          <Card
            key={cat.id}
            style={{ backgroundImage: cat.backgroundImage }}
          >
            <Heading text={cat.displayName} />
            <Text text={cat.description} />
            <Row>
              <Text text={cat.applicationCount.toString()} />
              <Text text={cat.moduleCount.toString()} />
            </Row>
          </Card>
        );
      })}
    </div>
  );
};

export default ApplicationCategories;
