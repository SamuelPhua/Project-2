import React from "react";
import { IMAGES } from "../Variables/Constants";

const Movie = ({
  movie,
  selectMovie,
  actionButtonLabel = "Add to Watch Later",
  onClickActionButton,
}) => {
  return (
    <div onClick={() => selectMovie(movie)} className="movie">
      <div>
        <div className="image-movie">
          {movie.poster_path && (
            <img src={IMAGES + movie.poster_path} alt={movie.title} />
          )}
        </div>
        <div className="movie-infos">
          <h5 className="movie-title">{movie.title}</h5>
          <button
            className="button"
            onClick={() => {
              onClickActionButton?.(movie);
            }}
          >
            {actionButtonLabel}
          </button>
          {movie.vote_average ? (
            <span className="movie-voting">
              {movie.vote_average.toFixed(1)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Movie;
