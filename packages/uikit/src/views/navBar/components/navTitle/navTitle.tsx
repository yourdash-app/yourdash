import React from "react";
import Heading from "../../../../components/heading/heading.tsx";

const NavTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <Heading
      text={title}
      level={2}
    />
  );
};

export default NavTitle;
