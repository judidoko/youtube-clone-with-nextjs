"use client";

import { useState } from "react";
import useSWR from "swr";
import Loading from "../loading";

import { fetchVideos } from "@/lib/api";
import Thumbnail from "@/components/Thumbnail";
import { SearchBadge } from "@/components/SearchBadge";

export default function Home() {
  // Hooks
  const [badge, setBadge] = useState("All");
  const {
    data: videoResults,
    error,
    isLoading,
  } = useSWR(`fetchVideo/${badge}`, () => fetchVideos(badge, 12));
  // If there is error
  if (error) {
    throw new Error("Error fetching video data");
  }
  return (
    <>
      <div className="fixed px-2 py-2 md:pl-[252px] top-16 left-0 w-screen z-20 dark:bg-black bg-white ">
        <SearchBadge
          badges={["All", "JavaScript", "Reactjs", "Tailwind"]}
          currentBadge={badge}
          setBadge={setBadge}
        />
      </div>
      <div className="flex flex-wrap">
        {isLoading &&
          Array(12)
            .fill(null)
            .map((i, index) => <Loading key={index} />)}
        {videoResults?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
