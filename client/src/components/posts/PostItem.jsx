import { Card } from "flowbite-react";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import { Link } from "react-router-dom";
import CardHeader from "./CardHeader";
import CreateComment from "../comment/CreateComment";
import CommentItem from "../comment/CommentItem";
import { useEffect, useState } from "react";
import EditPost from "./EditPost";
import ModalWrapper from "../shared/ModalWrapper";
import { customTheme } from "../../lib/flowbiteTheme";
import { useAuth } from "../../hooks/useAuth";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { TbMessage } from "react-icons/tb";
import { FaShare } from "react-icons/fa";
import { likePostService } from "../../services/post.service";
import { extractErrorMessage } from "../../lib/response.error";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../../config/config";

export default function PostItem({ post, showAllComments = false }) {
  const { userData } = useAuth();
  const {
    _id,
    content,
    attachment,
    allowComments,
    comments,
    createdBy,
    likes,
  } = post;
  const [editPost, setEditPost] = useState(false);
  const likePostMe = likes.some((item) => item === userData._id);
  const [likePost, setLikePost] = useState(likePostMe);
console.log(userData?._id === createdBy._id);

  const handleLike = async (newState) => {
    const prevState = likePost;
    setLikePost(newState);
    try {
      if (newState) await likePostService(_id);
      else await likePostService(_id, "disLike");
    } catch (err) {
      setLikePost(prevState);
      const errorMessage = extractErrorMessage(err);
      toast.error(errorMessage, { theme: "dark", autoClose: 2000 });
    }
  };

  return (
    <>
      <Card theme={customTheme.card}>
        <CardHeader post={post} setEditPost={setEditPost} />
        <p className={`font-normal text-gray-700 dark:text-gray-200 truncate `}>
          {content}
        </p>
        {attachment.length > 0 &&
          attachment.map((item, idx) => (
            <div key={idx} className="h-40 w-full bg-black rounded-lg">
              <img
                src={item}
                alt="post img"
                className="h-40 w-full object-contain rounded-lg"
              />
            </div>
          ))}

        <footer className="flex gap-14 text-xl mt-2 text-gray-300">
          <div
            className={`flex gap-1 items-center cursor-pointer hover:text-amber-300 ${likePostMe ? "text-amber-300" : "text-gray-300"}  duration-300`}
          >
            {likePost ? (
              <IoHeartSharp onClick={() => handleLike(false)} />
            ) : (
              <IoHeartOutline onClick={() => handleLike(true)} />
            )}
            <span className="text-sm">{likes.length}</span>
          </div>

          <Link
            className="flex gap-1 items-center cursor-pointer hover:text-amber-300 duration-300"
            to={`/posts/details/${_id}`}
          >
            <TbMessage />
            <span className="text-sm">{comments.length}</span>
          </Link>

          <FaShare size={18} />
        </footer>

        {showAllComments &&
          comments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
                    
        {(allowComments === "allow" || userData?._id === createdBy._id) && (
          <CreateComment postId={_id} />
        )}
      </Card>
      {editPost && (
        <ModalWrapper openModal={editPost} setOpenModal={setEditPost}>
          <EditPost
            postId={_id}
            body={body}
            image={image}
            setEditPost={setEditPost}
          />
        </ModalWrapper>
      )}
    </>
  );
}
