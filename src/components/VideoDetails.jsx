/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import { abbreviateNumber } from "js-abbreviation-number";
import SuggestionVideoCard from "./SuggestionVideoCard";
import { checkSubscriptionStatus, fetcAllVideos } from "../utils";
import { useQuery } from "@tanstack/react-query";

const VideoDetails = ({ video }) => {
  const { isSubscribed } = checkSubscriptionStatus(video.owner._id);
  const [relatedVideos, setRelatedVideos] = useState();
  const {
    data: videos,
    isError,
    isLoading,
    error,
  } = useQuery({ queryKey: ["videos"], queryFn: fetcAllVideos });

  console.log("video >>>>>", video);
  console.log("many videos >>>>>", videos);
  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-black overflow-y-scroll">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
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
              <div className="text-white font-bold xl mt-4 line-clamp-2">
                {video?.title}
              </div>
              <div className="text-white font-bold text-bases">
                {video?.description}
              </div>
            </div>
            <div className="flex text-white mt-4 md:mt-0">
              <div className="flex items-center justify-center">
                <AiOutlineLike className="text-xl text-white mr-2" />
                {`${abbreviateNumber(video?.stats?.views, 2)} Likes`}
              </div>
              <div className="flex items-center justify-center ml-4">
                {`${abbreviateNumber(video?.views, 2)} Views`}
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
                {isSubscribed ? (
                  <button className="text-base px-3 py-2 bg-white text-black rounded-lg">
                    Unsbscribe
                  </button>
                ) : (
                  <button className="text-base px-3 py-2 bg-red-600 rounded-lg text-white">
                    subscribe
                  </button>
                )}
              </div>
            </div>
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
