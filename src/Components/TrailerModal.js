import React from "react";
import YouTube from "react-youtube";

const TrailerModal = ({ videoId, onClose }) => {
  return (
    <div id="myModal" class="modal">
      <div className="modal-video">
        <YouTube
          videoId={videoId}
          opts={{
            width: 600,
            height: 350,
            playerVars: {
              autoplay: 1,
              controls: 0,
              cc_load_policy: 0,
              fs: 0,
              iv_load_policy: 0,
              modestbranding: 0,
              rel: 0,
              showinfo: 0,
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
