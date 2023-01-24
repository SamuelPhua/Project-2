import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import movieTrailer from "movie-trailer";
import "../Styles/TrailerMovies.css";

const TrailerMovies = (props) => {
  const [video, setVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const handleSearch = () => {
    setVideo(props.moviesTitle);
    movieTrailer(video).then((res) => {
      setVideoUrl(res);
    });
  };

  useEffect(() => {
    handleSearch();
  }, [videoUrl]);

  return (
    <>
      <div className="Container"></div>
      <div className="player">
        <ReactPlayer
          url={videoUrl}
          controls={true}
          width={"900px"}
          height={"600px"}
          muted={false}
        />
      </div>
    </>
  );
};

export default TrailerMovies;
