import React, { useEffect, useState } from "react";
import { IMAGES } from "../Variables/Constants";
import TrailerModal from "./TrailerModal";

const Banner = ({ singleMovie, trailer }) => {
  const [playing, setPlaying] = useState(false);
  
  useEffect(() => {
    setPlaying(false);
  }, [singleMovie]);

  return (
    <div
      className="poster"
      style={{
        backgroundImage: `url(${IMAGES}${singleMovie?.backdrop_path})`,
      }}
    >
      {playing ? (
        <TrailerModal
          videoId={trailer.key}
          onClose={() => {
            setPlaying(false);
          }}
        />
      ) : (
        <div className="center-max-size">
          <div className="poster-content">
            {trailer ? (
              <button
                className="button play-video"
                onClick={() => setPlaying(true)}
                type="button"
              >
                Play Trailer
              </button>
            ) : (
              <></>
            )}
            <h1>{singleMovie?.title ?? ""}</h1>
            <p>{singleMovie?.overview ?? ""}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
