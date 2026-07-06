import axios from "axios";
import { Label, Textarea } from "flowbite-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import AppButton from "../shared/AppButton";
import { MdEdit } from "react-icons/md";

export default function EditPost({ postId, image, body, setEditPost }) {
  const fileInputRef = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: "onChange" });
  const [photoPost, setPhotoPost] = useState(image || null);
  const queryClient = useQueryClient();

  console.log(photoPost);

  const { mutate, isPending } = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      reset();
      toast.success("Post created Successfully", {
        theme: "dark",
        autoClose: 2000,
      });
      setEditPost(false);
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

  async function updatePost(data) {
    const formData = new FormData();
    formData.append("body", data.body);
    if (fileInputRef.current?.files[0]) {
      formData.append("image", fileInputRef.current?.files[0]);
      setPhotoPost(fileInputRef.current?.files[0]);
    }
    return await axios.put(
      `${import.meta.env.VITE_BASE_URL}/posts/${postId}`,
      formData,
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit(mutate)} className="flex flex-col gap-4">
      <div className="mb-2 block">
        <Label htmlFor="comment" className="text-xl">
          Update Post
        </Label>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <Textarea
          {...register("body", { required: true })}
          defaultValue={body}
          id="comment"
          placeholder="Leave a comment..."
          rows={2}
        />
        <div className="w-fit relative">
          {photoPost && (
            <img
              src={photoPost}
              alt="post img"
              className="max-h-72 object-contain rounded-lg"
            />
          )}
          <div
            className="absolute -bottom-2 -end-2 w-10 h-10 text-white bg-gray-700 cursor-pointer rounded-full flex justify-center items-center hover:bg-gray-800"
            onClick={() => fileInputRef.current.click()}
          >
            <input
              {...register("image")}
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (e.target.files && file) {
                  setPhotoPost(URL.createObjectURL(file));
                }
              }}
            />
            <MdEdit />
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-3">
        <AppButton
          isLoading={isPending}
          disabled={!isValid || isPending}
          type="submit"
          className="w-1/2"
        >
          Update
        </AppButton>
        <AppButton
          type="submit"
          color=""
          className="w-1/2 border cursor-pointer text-gray-300 hover:bg-gray-800/30"
          onClick={() => setEditPost(false)}
        >
          Cancel
        </AppButton>
      </div>
    </form>
  );
}
