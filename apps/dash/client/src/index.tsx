import React from "react";
import { Route, Routes } from "react-router-dom";
import DashIndexPage from "./IndexPage";

const DashApplication: React.FC = () => {
  return (
    <Routes>
      <Route index element={<DashIndexPage />} />
      <Route path={`customize`} element={<h1>Hmm test</h1>} />
    </Routes>
  );
};

export default DashApplication;
