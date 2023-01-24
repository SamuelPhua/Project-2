import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineClose, AiFillPlayCircle } from "react-icons/ai";
import NoImage from "./NoImage.jpg";
import { Container } from "./NavBar";
import "../Styles/Videos.css";
import TrailerTrending from "../Trailers/TrailerTrending";

const Trending = () => {
  const { inputValue } = useContext(Container);
  const input = inputValue;
  const [trendingArr, setTrendingArr] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState("");

  const images = "https://image.tmdb.org/t/p/w500";
  const apiKey = "https://api.themoviedb.org/3";
  const showTrends = "/trending/all/week";

  const trends = async () => {
    const data = await axios.get(`${apiKey}${showTrends}`, {
      params: {
        api_key: "84f7adca7d5ad61fa5954db01687a8f7",
        query: input,
      },
    });
    const response = data.data.results;
    setTrendingArr(response);
  };

  useEffect(() => {
    trends();
  }, [input]);
  console.log(trendingArr);

  const trendTitle = (props) => {
    setTitle(props.title);
    setTitle(props.name)
    setTrailer(!trailer);
  };

  return (
    <>
      <div className="mainbackgroundcolor">
        <div className="movies-container">
          {trendingArr.map((props) => {
            return (
              <div id={trailer ? "container" : "no-container"}>
                <AiFillPlayCircle
                  color="white"
                  fontSize={40}
                  id={trailer ? "playicon" : "hide"}
                  onClick={() => trendTitle(props)}
                />
                <img
                  src={
                    props.poster_path
                      ? `${images}${props.poster_path}`
                      : NoImage
                  }
                  alt=""
                  onClick={() => trendTitle(props)}
                />
                <h3 id="font" className="maincolor">
                  {props.name || props.title}
                </h3>
              </div>
            );
          })}
          {trailer ? console.log : <TrailerTrending trendTitle={title} />}
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

export default Trending;
