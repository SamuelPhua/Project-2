import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import "../Styles/Videos.css";
import NoImage from "./NoImage.jpg";
import { Container } from "./NavBar";
import TrailerMovies from "../Trailers/TrailerMovies";

const Movies = () => {
  const { inputValue } = useContext(Container);
  const input = inputValue;
  const [movieData, setMovieData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState("");

  const shown = input ? "search" : "discover";
  const images = "https://image.tmdb.org/t/p/w500";
  const apiKey = `https://api.themoviedb.org/3/${shown}/movie`;

  const MovieCall = async () => {
    const data = await axios.get(apiKey, {
      params: {
        api_key: "84f7adca7d5ad61fa5954db01687a8f7",
        query: input,
      },
    });

    // console.log(data);
    const response = data.data.results;
    setMovieData(response);
  };

  useEffect(() => {
    MovieCall();
  }, [input]);

  // console.log(movieData)

  const _movieTitle = (movie) => {
    setMovieTitle(movie.title);
    setTrailer(!trailer);
  };

  return (
    <>
      <div className="mainbackgroundcolor">
        <div className="movies-container">
          {movieData.map((props, index) => {
            return (
              <div key={props.id}>
                <div id={trailer ? "container" : "no-container"}>
                  <AiFillPlayCircle
                    color="white"
                    fontSize={40}
                    id={trailer ? "playicon" : "hide"}
                    onClick={() => _movieTitle(props)}
                  />
                  <img
                    src={
                      props.poster_path
                        ? `${images}${props.poster_path}`
                        : NoImage
                    }
                    alt=""
                    onClick={() => _movieTitle(props)}
                  />
                  <h3 id="font" className="maincolor">
                    {props.title}
                  </h3>
                </div>
              </div>
            );
          })}
          {trailer ? console.log : <TrailerMovies moviesTitle={movieTitle} />}
          <AiOutlineClose
            id={trailer ? "nothing" : "exit"}
            fontSize={30}
            color="white"
            cursor={"pointer"}
            onClick={() => setTrailer(true)}
          />
        </div>
      </div>
    </>
  );
};

export default Movies;
