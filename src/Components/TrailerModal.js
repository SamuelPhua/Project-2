import React from "react";
import YouTube from "react-youtube";

const TrailerModal = ({ videoId, onClose }) => {
  return (
    <div id="myModal" class="modal">
      <div className="modal-video">
        <YouTube
          videoId={videoId}
          opts={{
            width: 1060,
            height: 500,
            playerVars: {
              autoplay: 1,
              controls: 0, // control playing of the video
              rel: 0, // related videos
            },
          }}
        />
      </div>
      <button onClick={onClose} className="button close-button-modal">
        Close
      </button>
    </div>
  );
};

export default TrailerModal;
