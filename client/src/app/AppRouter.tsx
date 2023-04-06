import React from "react";
import { Route } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <>
      <Route path={`dash`} lazy={() => import(`./apps/dash/index`)} />
    </>
  );
};

export default AppRouter;
