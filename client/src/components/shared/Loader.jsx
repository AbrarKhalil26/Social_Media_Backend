import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loader({count = 3}) {
  return (
    <div className="flex justify-center items-center">
      <Skeleton
        className="h-96 rounded"
        baseColor="#1F2837"
        highlightColor="#111827"
        count={count}
      />
    </div>
  );
}
