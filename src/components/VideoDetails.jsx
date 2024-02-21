/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestionVideoCard from "./SuggestionVideoCard";
import {
  checkSubscriptionStatus,
  fetcAllVideos,
  toggleLikeToVideo,
  toggleSubscription,
  videoAddViewHistory,
} from "../utils";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CommentSec from "./CommentSec";

const VideoDetails = ({ video, handleInvalidateQuery }) => {
  const [relatedVideos, setRelatedVideos] = useState();
  const {
    data: videos,
    isError,
    isLoading,
    error,
  } = useQuery({ queryKey: ["videos"], queryFn: fetcAllVideos });

  const handleToggleSubscription = () => {
    toggleSubscription(video.owner._id);
    handleInvalidateQuery();
  };

  const handleLikeToggle = () => {
    toggleLikeToVideo(video._id);
    handleInvalidateQuery();
  };

  useEffect(() => {
    console.log("================================");
    videoAddViewHistory(video._id);
    handleInvalidateQuery();
  }, []);

  console.log("video >>>>>", video);
  // console.log("many videos >>>>>", videos);
  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black overflow-y-scroll">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className=" ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            {/* <ReactPlayer
              url={video.videoFile}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            /> */}
            <video
              src={video.videoFile}
              controls
              width={"100%"}
              height={"100%"}
              style={{ backgroundColor: "#000000" }}
              autoPlay={true}
            ></video>
          </div>
          <div className="flex justify-between w-full">
            <div>
              <div className="text-white font-bold text-2xl mt-4 line-clamp-2">
                {video?.title}
              </div>
              <div className="text-white font-bold text-bases">
                {video?.description}
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center">
                <button onClick={handleLikeToggle}>
                  <AiFillLike
                    className={`text-xl  mr-2 ${
                      video.likedByMe ? "text-red-600" : "text-white"
                    }`}
                  />
                </button>
                {video.totalLikes} Likes
              </div>
              <div className="flex items-center justify-center ml-4">
                {video?.views} Views
              </div>
            </div>
          </div>
          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex gap-3 items-center">
                <div className="flex items-start">
                  <div className="flex h-11 w-11 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={video?.owner?.avatar}
                      alt="avatar"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-white text-md font-semibold flex items-center">
                    {video?.owner.username}
                  </div>
                  <div className="text-white text-[10px] font-semibold flex items-center">
                    {video?.owner.fullname}
                  </div>
                </div>
              </div>
              <div>
                {video.isSubscribed ? (
                  <button
                    className="text-base px-5 py-2 bg-white text-black rounded-lg"
                    onClick={handleToggleSubscription}
                  >
                    Unsbscribe
                  </button>
                ) : (
                  <button
                    className="text-base px-5 py-2 bg-red-600 rounded-lg text-white"
                    onClick={handleToggleSubscription}
                  >
                    subscribe
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="comments w-full my-5">
            <CommentSec videoId={video._id} handleInvalidateQuery={handleInvalidateQuery}/>
          </div>
        </div>
        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px]">
          {/* {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })} */}
          {videos?.map((item, index) => {
            return <SuggestionVideoCard key={index} video={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
