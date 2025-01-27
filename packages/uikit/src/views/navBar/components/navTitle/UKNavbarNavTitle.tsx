import React from "react";
import UKHeading from "../../../../components/heading/UKHeading.tsx";

const UKNavbarNavTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <UKHeading
      text={title}
      level={2}
    />
  );
};

export default UKNavbarNavTitle;
