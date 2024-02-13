"use client";

import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetchVideoDetails } from "@/lib/api";
import Loading from "../../loading";

const VideoDetails = () => {
  const { id } = useParams();
  const {
    data: videos,
    isLoading: loadingVideoDetails,
    error: errorVideoDetails,
  } = useSWR(`/videoDatails/${id}`, () => fetchVideoDetails(id as string), {
    revalidateOnFocus: false,
  });

  if (errorVideoDetails) {
    throw new Error("Error fetching video data");
  }
  console.log(videos);

  if (loadingVideoDetails) return <Loading />;
  return <div>VideoDetails</div>;
};

export default VideoDetails;
