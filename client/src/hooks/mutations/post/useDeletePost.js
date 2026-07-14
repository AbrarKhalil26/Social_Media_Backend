import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ErrorToast } from "../../../lib/response.error";
import { deletePostService } from "../../../services/post.service";
import { QUERY_KEYS } from "../../../config/queryKeys";
import { toast } from "react-toastify";

export const useDeletePost = ({ endPoint }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deletePostService(endPoint),
    onSuccess: (res) => {
      queryClient.invalidateQueries([QUERY_KEYS.DETAILS_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.USER_POSTS]);
      queryClient.invalidateQueries([QUERY_KEYS.ALL_POSTS]);
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
    },
    onError: (err) => ErrorToast(err),
  });
};
