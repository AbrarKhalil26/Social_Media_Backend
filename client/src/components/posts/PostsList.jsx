import PostItem from "./PostItem";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../shared/Loader";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import { QUERY_KEYS } from "../../config/queryKeys";

export default function PostsList({ isProfile = true }) {
  const { userData } = useContext(AuthContext);
  const { token } = useAuth();
  // const queryKey = isProfile ? ["all-posts"] : ["user-posts"];
  const queryKey = [QUERY_KEYS.USER_POSTS];

  // const endPoint = `${
  //   isProfile ? `/posts/${userData?._id}` : `/posts`
  // }/posts?limit=50${isProfile ? `` : `&sort=-createdAt`}`;

  const { data, isLoading, isError, error } = useFetch({
    queryKey,
    endPoint: "/posts",
    options: { select: (data) => data.data },
  });
  console.log(data);

  return (
    <div className="py-12">
      <div className="flex flex-col gap-4">
        {isError && <p>Error: {error.message}</p>}
        {isLoading && <Loader />}
        {data && data.map((post) => <PostItem key={post.id} post={post} />)}
      </div>
    </div>
  );
}
