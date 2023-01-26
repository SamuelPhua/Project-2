import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ fetchMovies, setSearch }) => {
  const navigate = useNavigate();

  return (
    <header className="center-max-size header">
      <Link to="/">
        <span className="brand">Movie App</span>
      </Link>
      <form className="form" onSubmit={fetchMovies}>
        <input className="search" onInput={(e) => setSearch(e.target.value)} />
      </form>
      <button className="watchlater" onClick={() => navigate("/watch_later")}>
        Watch Later
      </button>
    </header>
  );
};
export default Header;
