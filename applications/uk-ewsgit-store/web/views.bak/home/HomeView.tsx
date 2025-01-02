/*
 * Copyright ©2025 Ewsgit<https://github.com/ewsgit> and YourDash<https://github.com/yourdash> contributors.
 * YourDash is licensed under the MIT License. (https://ewsgit.mit-license.org)
 */

import clippy from "@yourdash/shared/web/helpers/clippy";
import Heading from "@yourdash/chiplet/components/heading/Heading";
import * as React from "react";
import { type StorePromotedApplication } from "@yourdash/shared/apps/store/storePromotedApplication";
import coreCSI from "@yourdash/csi/coreCSI";
import StoreCategory from "../../component/storeCategory/StoreCategory";
import StoreApplication from "../../component/storeApplication/StoreApplication";
import StoreHeader from "../../component/storeHeader/StoreHeader";
import styles from "./HomeView.module.scss";

const StoreApplicationRoot: React.FC = () => {
  const trans = useTranslate("store");
  const [promotedApplications, setPromotedApplications] = React.useState<StorePromotedApplication[]>([]);
  const [categories, setCategories] = React.useState<string[]>([]);
  const [applications, setApplications] = React.useState([]);

  React.useEffect(() => {
    coreCSI.syncGetJson("/app/store/promoted/applications", (data) => {
      setPromotedApplications(data);
    });

    coreCSI.syncGetJson("/app/store/categories", (data) => {
      setCategories(data);
    });

    coreCSI.syncGetJson("/app/store/applications", (data) => {
      setApplications(data);
    });
  }, []);

  return (
    <main className={clippy("flex flex-col gap-2", styles.main)}>
      <StoreHeader />
      <Heading level={2}>{trans("ALL_CATEGORIES_SECTION")}</Heading>
      {categories.length !== 0 && (
        <section
          className={"grid 3xl:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-2 gap-2 animate__animated animate__fadeIn animate__250ms"}
        >
          {categories.map((category) => (
            <StoreCategory
              id={category}
              key={category}
            />
          ))}
        </section>
      )}
      <Heading level={2}>{trans("ALL_APPLICATIONS_SECTION")}</Heading>
      {applications.length !== 0 && (
        <section className={"grid grid-cols-1 gap-2 animate__animated animate__fadeIn animate__500ms md:grid-cols-2 lg:grid-cols-3"}>
          {/* TODO: type this */}
          {applications.map((application) => (
            <StoreApplication
              // @ts-ignore
              id={application.value}
              // @ts-ignore
              displayName={application.displayName}
              // @ts-ignore
              key={application.value}
              // @ts-ignore
              icon={application.icon}
            />
          ))}
        </section>
      )}
    </main>
  );
};

export default StoreApplicationRoot;
