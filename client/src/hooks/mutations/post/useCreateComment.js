import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCommentService } from "../../../services/post.service";
import { extractErrorMessage } from "../../../lib/response.error";
import { toast } from "react-toastify";

export const useCreateComment = (id, reset) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => addCommentService(id, data),
    onSuccess: (res) => {
      reset();
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
      queryClient.invalidateQueries(["details-posts", id]);
      queryClient.invalidateQueries(["user-posts", id]);
      queryClient.invalidateQueries(["all-posts", id]);
    },
    onError: (err) => {
      toast.error(extractErrorMessage(err), { theme: "dark", autoClose: 2000 });
    },
  });
};
