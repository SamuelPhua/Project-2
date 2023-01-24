import React, { useState } from "react";
import { HiSearch } from "react-icons/hi";
import { Routes, Route, NavLink } from "react-router-dom";
import Movies from "./Movies";
import TvShows from "./TvShows";
import Trending from "./Trending";
import "../Styles/NavBarStyle.css";

export const Container = React.createContext();

const NavBar = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <Container.Provider value={{ inputValue }}>
        <nav className="navBarColor">
          <div className="nav-options">
            <h1 id="heading">Movie App</h1>
            <NavLink to="">
              <span id="MoviesLight">Movies</span>
            </NavLink>
            <NavLink to="/TvShows">
              <span id="MoviesLight">TV Shows</span>
            </NavLink>
            <NavLink to="/Trending">
              <span id="MoviesLight">Trending</span>
            </NavLink>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => setInputValue(e.target.value)}
            />
            <HiSearch fontSize={21} color="black" id="search" />
          </div>
        </nav>
        <Routes>
          <Route path="" element={<Movies />} />
          <Route path="TvShows" element={<TvShows />} />
          <Route path="Trending" element={<Trending />} />
        </Routes>
      </Container.Provider>
    </>
  );
};

export default NavBar;
