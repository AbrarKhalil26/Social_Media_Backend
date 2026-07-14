import { Card } from "flowbite-react";
import CardHeader from "./CardHeader";
import CreateComment from "../comment/CreateComment";
import CommentItem from "../comment/CommentItem";
import { useState } from "react";
import EditPost from "./EditPost";
import ModalWrapper from "../shared/ModalWrapper";
import { customTheme } from "../../lib/flowbiteTheme";
import { useAuth } from "../../hooks/useAuth";
import { likePostService } from "../../services/post.service";
import { ErrorToast } from "../../lib/response.error";
import useFetch from "../../hooks/useFetch";
import PostActions from "./PostActions";
import CreatePostHeaderModal from "./CreatePostHeaderModal";
import CreatePostModal from "./CreatePostModal";

export default function PostItem({ post, showAllComments = false }) {
  const { userData } = useAuth();
  const {
    _id,
    content,
    attachment,
    allowComments,
    availability,
    comments,
    createdBy,
    likes,
  } = post;
  const [isEditing, setIsEditing] = useState(false);
  const [availableCurrent, setAvailableCurrent] = useState(availability);
  const [allowCommentCurrent, setAllowCommentCurrent] = useState(allowComments);
  const likePostMe = likes.some((item) => item === userData._id);
  const [likePost, setLikePost] = useState(likePostMe);
  const { data: ownerPost } = useFetch({
    queryKey: ["owner-post", , createdBy],
    endPoint: `/users/${createdBy}`,
    options: { select: (data) => data.data },
  });

  return (
    <>
      <Card theme={customTheme.card}>
        <CardHeader owner={ownerPost} post={post} setIsEditing={setIsEditing} />
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

        <PostActions
          data={post}
          likePost={likePost}
          setLikePost={setLikePost}
          likePostMe={likePostMe}
        />

        {showAllComments &&
          comments.map((comment) => (
            <div>
              <CommentItem key={comment._id} comment={comment} postId={_id} />
            </div>
          ))}

        {(allowComments === "allow" || userData?._id === createdBy._id) && (
          <CreateComment postId={_id} />
        )}
      </Card>
      {isEditing && (
        <ModalWrapper
          header={
            <CreatePostHeaderModal
              availableCurrent={availableCurrent}
              setAvailableCurrent={setAvailableCurrent}
              allowCommentCurrent={allowCommentCurrent}
              setAllowCommentCurrent={setAllowCommentCurrent}
            />
          }
          body={
            <CreatePostModal
              data={{ _id, content, attachment }}
              availableCurrent={availableCurrent}
              allowCommentCurrent={allowCommentCurrent}
              isEditing={isEditing}
              setOpenModal={setIsEditing}
            />
          }
          openModal={isEditing}
          setOpenModal={setIsEditing}
        />
      )}
    </>
  );
}
