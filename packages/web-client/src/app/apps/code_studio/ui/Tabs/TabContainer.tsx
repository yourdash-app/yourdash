import React from "react";

const TabContainer: React.FC = () => {
  const [tabs, setTabs] = React.useState<{
    title: string,
    file: string
  }[]>( [] );
  return <div className={"flex items-center justify-center h-8 bg-container-bg text-container-fg border-b border-container-border"}>{"TabContainer component"}</div>;
};

export default TabContainer;
