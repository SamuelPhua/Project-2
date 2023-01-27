import React from "react";
import Header from "../Components/Header";

const MainLayout = ({ fetchMovies, setSearch, children }) => {
  return (
    <div className="App">
      <Header
        className="search"
        fetchMovies={fetchMovies}
        setSearch={setSearch}
      />
      {children}
    </div>
  );
};

export default MainLayout;
