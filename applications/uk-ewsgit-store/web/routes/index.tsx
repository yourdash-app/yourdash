import React from "react";
import ApplicationCategories from "./(components)/sections/applicationCategories/applicationCategories.tsx";
import PromotedApplications from "./(components)/sections/promotedApplications/promotedApplications";
import Heading from "@yourdash/uikit/src/components/heading/heading";
import styles from "./index.module.scss";

const ApplicationIndexPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Heading text={"Recommended Applications"} />
      <PromotedApplications />
      <Heading text={"Categories"} />
      <ApplicationCategories />
    </div>
  );
};

export default ApplicationIndexPage;
