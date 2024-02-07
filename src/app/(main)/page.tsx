"use client";

import { useState } from "react";
import useSWR from "swr";

import { fetchVideos } from "@/lib/api";

export default function Home() {
  // Hooks
  const [badge, setBadge] = useState("All");
  const {
    data: videoResults,
    error,
    isLoading,
  } = useSWR(`fetchVideo/${badge}`, () => fetchVideos("badge", 10));
  console.log(videoResults);
  return (
    <>
      <div>Youtube-clone</div>
    </>
  );
}
