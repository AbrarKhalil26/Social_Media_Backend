import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/post.service";
import { toast } from "react-toastify";
import { extractErrorMessage } from "../../lib/response.error";

export const useCreatePost = ({
  reset,
  setPreview,
  fileInputRef,
  setOpenModal,
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      reset();
      setPreview(null);
      setOpenModal(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Post created Successfully", {
        theme: "dark",
        autoClose: 2000,
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER_POSTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_POSTS });
    },
    onError: (err) => {
      const errorMessage = extractErrorMessage(err);
      toast.error(errorMessage, { theme: "dark", autoClose: 2000 });
    },
  });
};
