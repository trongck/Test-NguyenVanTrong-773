"use client";

import { useVideoFeed } from "@/hooks/useVideoFeed";
import VideoCard from "@/components/VideoCard";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function VideoFeed() {
  const { videos, interactions, toggleLike } = useVideoFeed();

  return (
    <div className="flex w-full h-dvh overflow-hidden bg-black">
      <Sidebar />
      <main className="flex-1 h-dvh overflow-y-scroll snap-y snap-mandatory no-scrollbar lg:ml-[240px]">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            interaction={interactions[video.id] ?? { isLiked: false, likesCount: video.likesCount }}
            onToggleLike={toggleLike}
          />
        ))}
      </main>
      <BottomNav />
    </div>
  );
}
