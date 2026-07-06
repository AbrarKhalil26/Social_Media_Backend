import axios from "axios";
import { Card, Textarea } from "flowbite-react";
import CardHeader from "../posts/CardHeader";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AppButton from "../shared/AppButton";
import { AxiosInstance } from "../../services/api";

export default function CommentItem({ comment }) {
  const [editComment, setEditComment] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm();
  const queryClient = useQueryClient();

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
    return await AxiosInstance.put(`/comments/${comment._id}`, data);
  }

  return (
    <Card>
      <CardHeader comment={comment} setEditComment={setEditComment} isComment />
      {/* {editComment ? ( */}
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
      {/* ) : ( */}
        {/* <p className={`font-normal text-gray-700 dark:text-gray-200 truncate `}>
          {comment.content}
        </p>
      )} */}
    </Card>
  );
}
