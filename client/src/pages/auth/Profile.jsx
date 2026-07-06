import CreatePost from "../../components/posts/CreatePost";
import PostsList from "../../components/posts/PostsList";
import CardProfile from "../../components/profile/CardProfile";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  return (
    <>
      <Helmet>
        <title>Kudo | Profile</title>
      </Helmet>
      <div className="mx-auto my-6 px-5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10">
            <div className="col-span-2 lg:col-span-1">
              <CardProfile />
            </div>
            <div className="col-span-2">
              <CreatePost />
              <PostsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
