import React, { useEffect, useState } from "react";
import {
  API_KEY,
  DISCOVER_API,
  MOVIE_API,
  SEARCH_API,
} from "../Variables/Constants";
import axios from "axios";
import Banner from "../Components/Banner";
import Movie from "../Components/Movie";
import MainLayout from "../Layouts/MainLayout";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [singleMovie, setSingleMovie] = useState({});
  const [watchLaterList, setWatchLaterList] = useState([]);

  const fetchMovies = async (event) => {
    if (event) {
      event.preventDefault();
    }

    const { data } = await axios.get(`${search ? SEARCH_API : DISCOVER_API}`, {
      params: {
        api_key: API_KEY,
        query: search,
      },
    });

    setMovies(data.results);

    if (data.results.length) {
      await fetchSingleMovie(data.results[0].id);
    }
  };

  const fetchSingleMovie = async (id) => {
    const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer);
    }
    setSingleMovie(data);
  };

  const selectMovie = (movie) => {
    fetchSingleMovie(movie.id);
    setSingleMovie(movie);
  };

  const handleRemoveWatchLater = (movie) => {
    if (movie !== undefined) {
      const newWatchLater = watchLaterList.filter(
        (itemId) => itemId !== movie.id
      );
      setWatchLaterList(newWatchLater);
      localStorage.setItem("watch_later", JSON.stringify(newWatchLater));
    }
  };

  const handleAddWatchLater = (movie) => {
    if (movie !== undefined) {
      const newWatchLater = [...watchLaterList, movie.id];
      setWatchLaterList(newWatchLater);
      localStorage.setItem("watch_later", JSON.stringify(newWatchLater));
    }
  };

  const renderMovies = () =>
    movies.map((movie) => {
      const isMovieWatchLater = watchLaterList.includes(movie.id);
      return (
        <Movie
          selectMovie={selectMovie}
          key={movie.id}
          movie={movie}
          actionButtonLabel={
            isMovieWatchLater ? "Remove from Watch later" : "Add to Watch Later"
          }
          onClickActionButton={
            isMovieWatchLater ? handleRemoveWatchLater : handleAddWatchLater
          }
        />
      );
    });

  useEffect(() => {
    let watchLater = localStorage.getItem("watch_later");
    if (watchLater) {
      watchLater = JSON.parse(watchLater);
    } else {
      watchLater = [];
    }
    setWatchLaterList(watchLater);
    fetchMovies();
  }, []);

  return (
    <MainLayout setSearch={setSearch} fetchMovies={fetchMovies}>
      {movies.length > 0 ? (
        <main>
          {singleMovie ? (
            <Banner singleMovie={singleMovie} trailer={trailer} />
          ) : null}
          <div className="center-max-size container">{renderMovies()}</div>
        </main>
      ) : (
        <div className="not-found-movie">Sorry, no movies found</div>
      )}
    </MainLayout>
  );
};

export default HomePage;
