import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getHistory } from "../utils";
import { toast } from "react-toastify";

const History = () => {
  const {
    data: history,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: "history", queryFn: getHistory });
  console.log("history >>>>> ", history);
  return (
    <div className="bg-black text-white h-full min-h-screen">
      <h2 className="p-5 text-4xl">History</h2>
      {isLoading && (
        <p className="p-5 text-lg">
          Videos that you have watched will show up here
        </p>
      )}

      {isError && toast.error(error.message)}
      <div className="w-full max-w-3xl p-5 md:p-10 flex flex-col gap-5">
        {history?.map((video, videoIndex) => (
          <div key={videoIndex} className="h-52 w-full flex gap-5 ">
            <div className="w-60 lg:w-80 flex-shrink-0 overflow-hidden h-full relative rounded-lg">
              <img
                className="h-full w-full object-cover"
                src={video?.thumbnail}
                alt=""
              />
              <span className="absolute bottom-2 right-2 bg-black py-1 px-2 text-white text-xs rounded-md">
                {video?.duration}
              </span>
            </div>
            <div className="flex-grow px-5 flex flex-col gap-3 h-full">
              <h1 className="text-[24px] font-semibold">{video?.title}</h1>
              <h5 className="text-[16px]">{video?.description}</h5>
              <h4 className="text-[14px]">{video?.views} views</h4>
              <div className="flex gap-3 items-center">
                <div className="h-[30px] w-[30px] rounded-full bg-white overflow-hidden">
                  <img
                    className="h-full w-full object-cover"
                    src={video?.owner.avatar}
                    alt=""
                  />
                </div>
                <div className="">
                    <h3>{video?.owner.username}</h3>
                    <h3 className="text-[12px]">{video?.owner.fullname}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
