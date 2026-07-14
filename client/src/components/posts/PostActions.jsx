import React from "react";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { likePostService } from "../../services/post.service";
import { ErrorToast } from "../../lib/response.error";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "../../config/queryKeys";

export default function PostActions({
  data,
  likePost,
  setLikePost,
  likePostMe,
  isComment = false,
}) {
  const queryClient = useQueryClient();

  const handleLike = async (newState) => {
    const prevState = likePost;
    setLikePost(newState);
    try {
      const res = newState
        ? await likePostService(data._id)
        : await likePostService(data._id, "disLike");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_POSTS] });
      console.log("cache keys:", queryClient.getQueryCache().getAll().map(q => q.queryKey));
      return res;
    } catch (err) {
      setLikePost(prevState);
      ErrorToast(err);
    }
  };
  return (
    <footer className="flex gap-14 text-xl mt-2 text-gray-300">
      <div
        className={`flex gap-1 items-center cursor-pointer hover:text-amber-300 ${likePostMe ? "text-amber-300" : "text-gray-300"}  duration-300`}
      >
        {likePost ? (
          <IoHeartSharp onClick={() => handleLike(false)} />
        ) : (
          <IoHeartOutline onClick={() => handleLike(true)} />
        )}
        <span className="text-sm">{data.likes.length}</span>
      </div>

      <Link
        className="flex gap-1 items-center cursor-pointer hover:text-amber-300 duration-300"
        to={`/posts/details/${data._id}`}
      >
        <TbMessage />
        <span className="text-sm">
          {data?.comments?.length || data?.replies?.length}
        </span>
      </Link>
      {!isComment && <FaShare size={18} />}
    </footer>
  );
}
