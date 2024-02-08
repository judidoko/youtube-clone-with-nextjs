"use client";

import { useState } from "react";
import useSWR from "swr";

import { fetchVideos } from "@/lib/api";
import Thumbnail from "@/components/Thumbnail";

export default function Home() {
  // Hooks
  const [badge, setBadge] = useState("All");
  const {
    data: videoResults,
    error,
    isLoading,
  } = useSWR(`fetchVideo/${badge}`, () => fetchVideos("badge", 10));

  return (
    <>
      <div className="fixed px-2 py-2 md:pl-[252px] top-16 left-0 w-screen z-20 dark:bg-black bg-white ">
        Search Bagde
      </div>
      <div className="flex flex-wrap">
        {videoResults?.map((video) => (
          <Thumbnail key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
