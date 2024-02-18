import React, { useContext, useEffect } from "react";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";
import { fetcAllVideos } from "../utils";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "../shared/loader";

const Feed = () => {
  const {
    data: videos,
    isError,
    isLoading,
    error,
  } = useQuery({ queryKey: ["videos"], queryFn: fetcAllVideos });

  console.log("videos>>>>>>>>>>>", videos);

  if (isLoading) {
    return (
      <>
        <Loader />
        <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center bg-black">
          <div className="h-[32px] w-[32px] border-l-2 border-b-2 animate-spin rounded-full"></div>
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[calc(100vh-64px)] flex justify-center items-center bg-black">
        {toast.error(error.message)}
        <h1 className="text-white">No video found</h1>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
        {videos &&
          videos.map((video, videoIndex) => (
            <VideoCard key={videoIndex} video={video} />
          ))}
      </div>
    </div>
  );
};

export default Feed;
