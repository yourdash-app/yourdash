import React from "react";
import PromotedApplications from "./(components)/sections/promotedApplications/promotedApplications";
import Heading from "@yourdash/uikit/components/heading/heading";
import styles from "./index.module.scss";

const ApplicationIndexPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Heading text={"Recommended Applications"} />
      <PromotedApplications />
      <Heading text={"Categories"} />
    </div>
  );
};

export default ApplicationIndexPage;
