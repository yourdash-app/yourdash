import React from "react";
import ApplicationCategories from "./(components)/sections/applicationCategories/applicationCategories.tsx";
import PromotedApplications from "./(components)/sections/promotedApplications/promotedApplications";
import styles from "./index.module.scss";
import UKHeading from "@yourdash/uikit/src/components/heading/UKHeading.js";

const ApplicationIndexPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <UKHeading text={"Recommended Applications"} />
      <PromotedApplications />
      <UKHeading text={"Categories"} />
      <ApplicationCategories />
    </div>
  );
};

export default ApplicationIndexPage;
