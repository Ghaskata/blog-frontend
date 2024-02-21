import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { BsChevronBarDown } from "react-icons/bs";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { addCommentOnVideo, fetchVideoComments } from "../utils";
import { toast } from "react-toastify";
import { AiFillLike } from "react-icons/ai";
import { date } from "language-tags";

const CommentSec = ({ videoId, handleInvalidateQuery }) => {
  const [content, setcontent] = useState("");
  const [showComment, setshowComment] = useState(true);
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["videoComment", { videoId }],
    queryFn: () => fetchVideoComments(videoId),
  });

  const handleAddComment = (e) => {
    e.preventDefault();
    if (content === "") {
      toast.error("comment not should be empty");
    }
    addCommentOnVideo(videoId, { content: content });
    handleInvalidateQuery();
    queryClient.invalidateQueries(["videoComment", { videoId }]);
    console.log(content);
  };
  return (
    <div className="commentSection text-white w-full">
      <div className="w-full">
        <div className="flex w-full justify-between items-center ">
          <h2 className="text-base">{comments?.length} Comments</h2>
          {showComment ? (
            <button
              className="flex items-center gap-2 "
              onClick={() => setshowComment(false)}
            >
              <FiChevronUp /> Hide all
            </button>
          ) : (
            <button
              className="flex items-center gap-2 "
              onClick={() => setshowComment(true)}
            >
              <FiChevronDown /> Show all
            </button>
          )}
        </div>
        <div className="mt-2 relative">
          <input
            type="text"
            value={content}
            name="content"
            onChange={(e) => setcontent(e.target.value)}
            className="bg-transparent border rounded-full w-full py-1 px-5"
            placeholder="Add Yor Comment"
          />
          <button
            className="absolute end-0 top-0 rounded-full bg-red-500 text-white h-full px-5 "
            onClick={handleAddComment}
          >
            Add
          </button>
        </div>
      </div>

      <div
        className={`comments_container w-full my-5 ${
          showComment ? "block" : "hidden"
        }`}
      >
        {isError && toast.error(error.message)}
        {comments?.length === 0 && (
          <h1 className="w-full text-center">No comments</h1>
        )}
        {comments?.map((comment, commentIndex) => (
          <div
            className="w-full p-3 flex border rounded gap-6 mb-3"
            key={commentIndex}
          >
            <div className="w-[38px] h-[38px] rounded-full flex-shrink-0 overflow-hidden bg-white">
              <img
                src={comment.owner.avatar}
                alt={comment.owner.username}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="w-full flex flex-col gap-1 flex-grow">
              <h2 className="text-sm">{comment.owner.username}</h2>
              <h2 className="text-base">{comment.content}</h2>
            </div>
            <div className="flex-shrink-0 flex h-full  flex-col justify-between">
              <h4 className="text-sm text-end">
                {new Date(comment.createdAt).getDate()}/{new Date(comment.createdAt).getMonth() + 1}
                /{new Date(comment.createdAt).getFullYear()}
              </h4>
              <div className="flex items-end mt-5">
                <button>
                  <AiFillLike
                    className={`text-xl  mr-2 
                       text-red-600 
                    }`}
                  />
                </button>
                total Likes
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSec;
