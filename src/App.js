import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { HomePage, WatchLaterPage } from "./Pages";

const App = () => {
  return (
    <Routes>
      <Route element={<WatchLaterPage />} path="/watch_later" />
      <Route element={<HomePage />} exact path="/" />
    </Routes>
  );
};

export default App;
