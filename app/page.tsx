"use client";

import dynamic from "next/dynamic";

const VideoFeed = dynamic(() => import("@/components/VideoFeed"), {
  ssr: false,
});

export default function HomePage() {
  return <VideoFeed />;
}
