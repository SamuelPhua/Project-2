import React from "react";
import Header from "../Components/Header";
import { Outlet } from "react-router-dom";

const MainLayout = ({ fetchMovies, setSearch, children }) => {
  return (
    <div className="App">
      <Header
        className="search"
        fetchMovies={fetchMovies}
        setSearch={setSearch}
      />
      {children}
      <Outlet />
    </div>
  );
};

export default MainLayout;
