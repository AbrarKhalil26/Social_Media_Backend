import { useParams } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import Loader from "../../components/shared/Loader";
import useFetch from "../../hooks/useFetch";
import { Helmet } from "react-helmet-async";

export default function PostDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useFetch({
    queryKey: ["details-post", id],
    endPoint: `/posts/${id}`,
    options: { select: (data) => data.data[0] },
  });
  console.log(data);
  

  return (
    <>
      <Helmet>
        <title>Kudo | Post: details</title>
      </Helmet>
      <div className="max-w-3xl md:mx-auto py-6 pr-4">
        {isError && <p>Error: {error.message}</p>}
        {isLoading && <Loader />}
        {data && (
          <PostItem
            post={data}
            key={data.id}
            showAllComments={true}
          />
        )}
      </div>
    </>
  );
}
