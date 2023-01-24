import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import NoImage from "./NoImage.jpg";
import { Container } from "./NavBar";
import "../Styles/Videos.css";
import TrailerTvShows from "../Trailers/TrailerTvShows";

const TvShows = () => {
  const { inputValue } = useContext(Container);
  const input = inputValue;
  const [showData, setShowData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("");

  const shown = input ? "search" : "discover";
  const apiKey = `https://api.themoviedb.org/3/${shown}/tv`;
  const images = "https://image.tmdb.org/t/p/w500";

  const tvShows = async () => {
    const data = await axios.get(apiKey, {
      params: {
        api_key: "84f7adca7d5ad61fa5954db01687a8f7",
        query: input,
      },
    });
    const response = data.data.results;
    setShowData(response);
  };

  useEffect(() => {
    tvShows();
  }, [input]);

  // console.log(showData)

  const tvShowTitle = (props) => {
    setTitle(props.name);
    setTrailer(!trailer);
  };

  return (
    <>
      <div className="mainbackgroundcolor">
        <div className="movies-container">
          {showData.map((props) => {
            return (
              <div key={props.id}>
                <div id={trailer ? "container" : "no-container"}>
                  <AiFillPlayCircle
                    color="white"
                    fontSize={40}
                    id={trailer ? "playicon" : "hide"}
                    onClick={() => tvShowTitle(props)}
                  />
                  <img
                    src={
                      props.poster_path
                        ? `${images}${props.poster_path}`
                        : NoImage
                    }
                    alt=""
                    onClick={() => tvShowTitle(props)}
                  />
                  <h3 id="font" className="maincolor">
                    {props.name}
                  </h3>
                </div>
              </div>
            );
          })}
          {trailer ? console.log : <TrailerTvShows tvShowsTitle={title} />}
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

export default TvShows;
