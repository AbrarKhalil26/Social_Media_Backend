import { Avatar, Dropdown, DropdownItem } from "flowbite-react";
import { formatDate, formatPostTime } from "../../lib/formateDate";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, PREFIX_USER } from "../../config/config";
import { TbDots } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export default function CardHeader({
  post,
  comment,
  isComment = false,
  setEditPost,
  setEditComment,
}) {
  const token = localStorage.getItem("token");
  const { userData } = useAuth();
  const { _id: postId, user, createdAt, createdBy } = post || {};
  const {
    photo,
    name,
    _id: userId,
  } = isComment ? comment?.commentCreator || {} : user || {};
  const commentId = comment?._id;
  const commentCreatedAt = comment?.createdAt;
  const queryClient = useQueryClient();

  const { mutate: handleDeletePost } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      toast.success(`${isComment ? "Comment" : "Post"} deleted successfully`, {
        theme: "dark",
        autoClose: 2000,
      });

      queryClient.invalidateQueries(["details-posts"]);
      queryClient.invalidateQueries(["user-posts"]);
      queryClient.invalidateQueries(["all-posts"]);
    },
    onError: (err) => {
      toast.error(
        `${
          isComment
            ? `You are not allowed to perform this action.`
            : `${err.response.data.error}`
        }`,
        {
          theme: "dark",
          autoClose: 2000,
        },
      );
    },
  });

  async function deletePost() {
    const endPoint = isComment ? "comments" : "posts";
    const idToDelete = isComment ? commentId : postId;
    return await axios.delete(`${BASE_URL}/${endPoint}/${idToDelete}`, {
      headers: { authorization: `${PREFIX_USER} ${token}` },
    });
  }

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        {createdBy?.profilePic ? (
          <Avatar
            img={createdBy.profilePic}
            alt="profile-person"
            className="me-4"
            rounded
          />
        ) : (
          <div className="me-4 w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center text-neutral-950 font-bold shrink-0">
            {createdBy?.userName?.slice(0,2)}
          </div>
        )}
        <div>
          <Link to={`/users/${createdBy._id}`}>
            <h2 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {createdBy?.userName}
            </h2>
          </Link>
          <p className="text-sm">
            {formatPostTime(createdAt || commentCreatedAt)}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        {userData?._id === createdBy._id && (
          <Dropdown
            inline
            arrowIcon={false}
            label={
              <TbDots
                size={25}
                className="cursor-pointer hover:text-amber-400"
              />
            }
          >
            <DropdownItem
              onClick={() => {
                isComment ? setEditComment(true) : setEditPost(true);
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={() => handleDeletePost()}
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        )}
      </div>
    </header>
  );
}
