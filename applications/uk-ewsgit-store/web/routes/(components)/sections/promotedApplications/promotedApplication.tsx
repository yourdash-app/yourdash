/*
 * Copyright ©2024 Ewsgit <https://ewsgit.uk> and YourDash <https://yourdash.ewsgit.uk> contributors.
 * YourDash is licensed under the MIT License. (https://mit.ewsgit.uk)
 */

import { Heading } from "@yourdash/uikit/components/index";
import styles from "./promotedApplication.module.scss";
import { EndpointStoreHomePromotedApplications } from "../../../../../shared/types/endpoints/home/promotedApplications.ts";
import { UKC } from "@yourdash/uikit";

const PromotedApplications: React.FC<{ application: EndpointStoreHomePromotedApplications[number] }> = ({ application }) => {
  console.log(application);

  return (
    <div className={styles.component}>
      <div className={styles.center}>
        <UKC.Image
          className={styles.icon}
          accessibleLabel={""}
          src={application.icon}
        />
        <Heading
          level={1}
          text={application.displayName}
          className={styles.displayName}
        />
      </div>
      <Heading
        level={5}
        text={application.description}
        className={styles.description}
      />
      <div className={styles.footer}>
        <UKC.Text
          text={application.developer}
          className={styles.developer}
        />
        <div className={styles.tags}>
          {application.tags.map((tag) => (
            <div className={styles.tag}>
              <UKC.Text text={tag} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotedApplications;
