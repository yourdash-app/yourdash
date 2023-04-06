import React from "react";
import { Route, Routes } from "react-router-dom";
import FilesIndexPage from "./IndexPage";

const DashApplication: React.FC = () => {
  return (
    <Routes>
      <Route index element={<FilesIndexPage />} />
      <Route path={`customize`} element={<h1>Hmm test</h1>} />
    </Routes>
  );
};

export default DashApplication;
