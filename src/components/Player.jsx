// import React, { useRef, useEffect } from "react";
// import videojs from "video.js";

// const Player = ({ video }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     const vjsPlayer = videojs(videoRef.current);

//     if (!video.videoFile) {
//       vjsPlayer.poster(video.thumbnail);
//     }

//     if (video.videoFile) {
//       vjsPlayer.src({ type: "video/mp4", src: videoFile });
//     }

//     // vjsPlayer.on("ended", () => {
//     //   client(`${process.env.REACT_APP_BE}/videos/${videoId}/view`);
//     // });

//     return () => {
//       if (vjsPlayer) {
//         vjsPlayer.dispose();
//       }
//     };
//   }, []);

//   return (
//     <div data-vjs-player>
//       <video
//         controls
//         ref={videoRef}
//         className="video-js vjs-fluid vjs-big-play-centered"
//       ></video>
//     </div>
//   );
// };

// export default Player;
