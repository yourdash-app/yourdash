import React from 'react';
import {Routes, Route} from 'react-router';
import GlobalDbApplication from './globalDbApplication';

const WeatherRouter: React.FC = () => (
  <Routes>
    <Route index element={<GlobalDbApplication/>}/>
  </Routes>
);

export default WeatherRouter;
