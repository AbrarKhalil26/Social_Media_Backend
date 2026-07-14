import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrEditPostService } from "../../../services/post.service";
import { toast } from "react-toastify";
import { ErrorToast } from "../../../lib/response.error";
import { QUERY_KEYS } from "../../../config/queryKeys";

export const useCreateOrEditPost = ({
  postId,
  isEditing,
  reset,
  setPreview,
  fileInputRef,
  setOpenModal,
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createOrEditPostService({ data, isEditing, postId }),
    onSuccess: (res) => {
      reset();
      setPreview(null);
      setOpenModal(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_POSTS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ALL_POSTS] });
    },
    onError: (err) => ErrorToast(err),
  });
};
