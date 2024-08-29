import React from "react";
import PromotedApplications from "./(components)/sections/promotedApplications/promotedApplications";
import Heading from "@yourdash/uikit/components/heading/heading";
import styles from "./index.module.scss";

const ApplicationIndexPage: React.FC = () => {
  return (
    <div className={styles.page}>
      <Heading text={"YourDash Store"} />
      <PromotedApplications />
    </div>
  );
};

export default ApplicationIndexPage;
