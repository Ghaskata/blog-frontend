import React from "react";
import { AiFillLike } from "react-icons/ai";
import { date } from "language-tags";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCommentLike, toggleLikeToComment } from "../utils";

const CommentCard = ({ comment, handleInvalidateQuery }) => {
  const commentid = comment._id;
  const queryClient = useQueryClient();
  const { data: commentLikeDetail, refetch } = useQuery({
    queryKey: ["commentLike", { commentid }],
    queryFn: () => fetchCommentLike(commentid),
  });
  // console.log("comment detaik >> ", commentLikeDetail);

  const handleToggleCommentLike = () => {
    toggleLikeToComment(comment._id);
    handleInvalidateQuery()
    queryClient.invalidateQueries(["commentLike", { commentid }]);
    refetch();
  };
  return (
    <div className="w-full p-3 flex border rounded gap-6 mb-3">
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
          {new Date(comment.createdAt).getDate()}/
          {new Date(comment.createdAt).getMonth() + 1}/
          {new Date(comment.createdAt).getFullYear()}
        </h4>
        <div className="flex items-end mt-5">
          <button onClick={handleToggleCommentLike}>
            <AiFillLike
              className={`text-xl  mr-2 
                       ${
                         commentLikeDetail?.likedByMe
                           ? "text-red-600 "
                           : "text-white"
                       }
                    }`}
            />
          </button>
          {commentLikeDetail?.totalLikes} Likes
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
