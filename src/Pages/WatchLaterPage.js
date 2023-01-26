import React, { useEffect, useState } from "react";
import { API_KEY, MOVIE_API, SEARCH_DETAIL } from "../Variables/Constants";
import axios from "axios";
import Banner from "../Components/Banner";
import Movie from "../Components/Movie";
import MainLayout from "../Layouts/MainLayout";
import { useNavigate } from "react-router-dom";

const WatchLaterPage = () => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [singleMovie, setSingleMovie] = useState({ title: "Loading Movies" });
  const [watchLaterList, setWatchLaterList] = useState([]);

  const fetchMovieDetail = async (id) => {
    const { data } = await axios.get(`${SEARCH_DETAIL}/${id}`, {
      params: {
        api_key: API_KEY,
      },
    });
    setMovies((state) => {
      if (!Boolean(state?.find(({ id }) => id === data.id))) {
        return [...state, data];
      }
      return state;
    });
  };

  const selectMovie = (movie) => {
    fetchSingleMovie(movie.id);
    setSingleMovie(movie);
    window.scrollTo(0, 0);
  };

  const handleRemoveWatchLater = (movie) => {
    if (movie !== undefined) {
      const newWatchLater = watchLaterList.filter(
        (itemId) => itemId !== movie.id
      );
      setWatchLaterList(newWatchLater);
      localStorage.setItem("watch_later", JSON.stringify(newWatchLater));
      const newMovies = movies.filter(({ id }) => newWatchLater.includes(id));
      setSingleMovie(newMovies?.[0]);
      fetchSingleMovie(newMovies?.[0]?.id);
      setMovies(newMovies);
    }
  };

  const fetchSingleMovie = async (id) => {
    if (id) {
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
        setTrailer(trailer ? trailer : data.videos.results[0]);
      }
      setSingleMovie(data);
    }
  };

  const fetchMovies = (event) => {
    if (event) {
      event.preventDefault();
    }

    const results = movies.filter(({ title }) =>
      title.toLowerCase().includes(search.toLowerCase())
    );
    fetchSingleMovie(results?.[0]?.id);

    setSearchMovies(results);
  };

  const renderMovies = () =>
    searchMovies.map((movie) => {
      return (
        <Movie
          selectMovie={selectMovie}
          key={movie.id}
          movie={movie}
          actionButtonLabel="Remove from Watch later"
          onClickActionButton={handleRemoveWatchLater}
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
    watchLater.forEach((item) => {
      fetchMovieDetail(item).catch((error) => console.log(error));
    });
  }, []);

  useEffect(() => {
    setSearchMovies(movies);
    fetchSingleMovie(movies?.[0]?.id);
  }, [movies]);

  return (
    <MainLayout setSearch={setSearch} fetchMovies={fetchMovies}>
      {searchMovies.length > 0 ? (
        <main>
          {singleMovie ? (
            <Banner singleMovie={singleMovie} trailer={trailer} />
          ) : null}
          <div className="center-max-size container">{renderMovies()}</div>
        </main>
      ) : (
        <div className="not-found-movie">
          <p>Sorry, no movies found</p>
          <button className="watchlater" onClick={() => navigate("/")}>
            {`Go to Home ==>`}
          </button>
        </div>
      )}
    </MainLayout>
  );
};

export default WatchLaterPage;
