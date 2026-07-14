import { Avatar, Badge, Dropdown, DropdownItem } from "flowbite-react";
import { formatDate, formatPostTime } from "../../lib/formateDate";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL, PREFIX_USER } from "../../config/config";
import { TbDots, TbWorld } from "react-icons/tb";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { customTheme } from "../../lib/flowbiteTheme";
import { FaUserFriends } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { useDeletePost } from "../../hooks/mutations/post/useDeletePost";

const AVAILABILITY_OPTIONS = [
  { value: "public", label: "Public", icon: TbWorld },
  { value: "only_me", label: "Only Me", icon: FaUserFriends },
  { value: "friends", label: "Friends", icon: FiLock },
];

export default function CardHeader({
  owner,
  post,
  comment,
  isComment = false,
  setIsEditing,
  setEditComment,
}) {
  const { userData } = useAuth();
  const { _id: postId, user, createdAt, createdBy, availability } = post || {};
  const { _id: commentId, createdAt: commentCreatedAt } = comment || [];
  const AvailabilityIcon = AVAILABILITY_OPTIONS.filter(
    (item) => item.value === availability,
  )[0];

  const { mutate: handleDeletePost } = useDeletePost({
    endPoint: isComment ? `${postId}/comments/${commentId}` : postId,
  });

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center">
        {owner?.profilePic ? (
          <Avatar
            img={owner?.profilePic}
            alt="profile-person"
            className="me-4"
            rounded
          />
        ) : (
          <div className="me-4 w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center text-neutral-950 font-bold shrink-0">
            {owner?.userName?.slice(0, 2)}
          </div>
        )}
        <div>
          <Link to={`/users/${owner?._id}`}>
            <h2 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white -mb-1 ">
              {owner?.userName}
            </h2>
          </Link>
          <div className="flex items-center gap-2">
            <p className="text-sm">
              {formatPostTime(createdAt || commentCreatedAt)}
            </p>
            {!isComment && (
              <>
                ,
                <Badge
                  color="dark"
                  theme={customTheme.badge}
                  className="dark:hover:bg-transparent"
                  icon={AvailabilityIcon.icon}
                >
                  {AvailabilityIcon.label}
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        {userData?._id === owner?._id && (
          <Dropdown
            inline
            arrowIcon={false}
            className="dark:bg-neutral-700"
            label={
              <TbDots
                size={25}
                className="cursor-pointer hover:text-amber-400"
              />
            }
          >
            <DropdownItem
              onClick={() => {
                isComment ? setEditComment(true) : setIsEditing(true);
                
              }}
              className="pl-4 pr-8 py-2 dark:text-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-700 focus:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              Edit
            </DropdownItem>
            <DropdownItem
              onClick={() => handleDeletePost()}
              className="pl-4 pr-8 py-2 dark:text-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-700 focus:bg-neutral-700 dark:focus:bg-neutral-700"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        )}
      </div>
    </header>
  );
}
