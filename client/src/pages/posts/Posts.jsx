import CreatePost from "../../components/posts/CreatePost";
import PostsList from "../../components/posts/PostsList";
import { Helmet } from "react-helmet-async";
import SuggestedFriends from "../../components/posts/SuggestedFriends";

export default function Posts() {
  
  return (
    <>
      <Helmet>
        <title>Kudo | Post</title>
      </Helmet>
      <div className="max-w-2xl mx-auto px-5 py-15">
        <CreatePost />
        {/* <SuggestedFriends/> */}
        <PostsList isProfile={false} />
      </div>
    </>
  );
}
