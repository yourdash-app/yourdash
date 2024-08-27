import React from "react";
import PromotedApplications from "./(components)/sections/promotedApplications/promotedApplications";
import Heading from "@yourdash/uikit/components/heading/heading";
import SidebarToggleButton from "@yourdash/uikit/views/sidebar/SidebarToggleButton";

const ApplicationIndexPage: React.FC = () => {
  return (
    <>
      <SidebarToggleButton />
      <Heading text={"YourDash Store"} />
      <PromotedApplications />
    </>
  );
};

export default ApplicationIndexPage;
