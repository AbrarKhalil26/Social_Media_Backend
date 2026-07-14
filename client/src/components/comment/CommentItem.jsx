import axios from "axios";
import { Card, Textarea } from "flowbite-react";
import CardHeader from "../posts/CardHeader";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AppButton from "../shared/AppButton";
import { AxiosInstance } from "../../services/api";
import useFetch from "../../hooks/useFetch";
import PostActions from "../posts/PostActions";

export default function CommentItem({ postId, comment }) {
  const [editComment, setEditComment] = useState(false);
  const { data: ownerComment } = useFetch({
    queryKey: "owner-comment",
    endPoint: `/users/${comment.createdBy}`,
  });
  const likePostMe = comment.likes.some((item) => item === userData._id);
  const [likePost, setLikePost] = useState(likePostMe);
  const { data: ownerPost } = useFetch({
    queryKey: ["owner-post", , comment.createdBy],
    endPoint: `/users/${comment.createdBy}`,
    options: { select: (data) => data.data },
  });

  const handleLike = async (newState) => {
    const prevState = likePost;
    setLikePost(newState);
    try {
      return newState
        ? await likePostService(_id)
        : await likePostService(_id, "disLike");
    } catch (err) {
      setLikePost(prevState);
      ErrorToast(err);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();
  const queryClient = useQueryClient();
  console.log("comment", comment);

  const { mutate, isPending } = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      reset();
      toast.success("Comment updated Successfully", {
        theme: "dark",
        autoClose: 2000,
      });
      setEditComment(false);
      queryClient.invalidateQueries(["details-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
    },
    onError: (err) => {
      toast.error(err.response.data.error, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });

  async function handleUpdate(data) {
    return await AxiosInstance.put(
      `/post/${postId}/comments/${comment._id}`,
      data,
    );
  }

  return (
    <div className="p-3 hover:bg-neutral-800 hover:rounded-lg">
      <CardHeader
        owner={ownerComment?.data}
        comment={comment}
        setEditComment={setEditComment}
        isComment="true"
      />

      {editComment ? (
        <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
          <Textarea
            defaultValue={comment.content}
            {...register("content", { required: true })}
            id="comment"
            placeholder="Leave a comment..."
            rows={2}
          />
          <div className="flex gap-3 justify-end">
            <AppButton
              isLoading={isPending}
              disabled={!isValid}
              type="submit"
              className="px-9"
            >
              Update
            </AppButton>
            <AppButton
              type="submit"
              color="dark"
              className="border cursor-pointer"
              onClick={() => setEditComment(false)}
            >
              Cancel
            </AppButton>
          </div>
        </form>
      ) : (
        <p
          className={`font-normal text-gray-700 dark:text-gray-200 truncate py-2 pl-13`}
        >
          {comment.content}
        </p>
      )}
      <div className="pl-13">
        <PostActions
          data={comment}
          likePost={likePost}
          likePostMe={likePostMe}
          handleLike={handleLike}
          isComment
        />
      </div>
    </div>
  );
}
