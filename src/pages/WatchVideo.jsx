import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import VideoDetails from "../components/VideoDetails";
import { toast } from "react-toastify";
import { fetchVideoAndOwnerDetail } from "../utils";
import Loader from "../shared/loader";

const WatchVideo = () => {
  const { videoId } = useParams();

  const {
    data: video,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["video", { videoId }],
    queryFn: () => fetchVideoAndOwnerDetail(videoId),
  });

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
      <VideoDetails video={video} />
    </div>
  );
};

export default WatchVideo;
