"use client";

import { useEffect, useState, useRef } from "react";
import { useVideoFeed } from "@/hooks/useVideoFeed";
import VideoCard from "@/components/VideoCard";
import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

const DEFAULT_INTERACTION = { isLiked: false, likesCount: 0 };

export default function VideoFeed() {
  const { videos, interactions, toggleLike } = useVideoFeed();
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Centralized Intersection Observer to manage active video play/pause
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: "0px",
      threshold: 0.6, // Active when at least 60% of the video card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-video-id");
          if (id) {
            setActiveVideoId(id);
          }
        }
      });
    }, observerOptions);

    // Observe all video cards
    const cards = container.querySelectorAll("[data-video-id]");
    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  return (
    <div className="flex w-full h-dvh overflow-hidden bg-black">
      <Sidebar />
      <main 
        ref={containerRef}
        className="flex-1 h-dvh overflow-y-scroll snap-y snap-mandatory no-scrollbar lg:ml-[240px]"
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            interaction={interactions[video.id] ?? DEFAULT_INTERACTION}
            onToggleLike={toggleLike}
            isActive={video.id === activeVideoId}
          />
        ))}
      </main>
      <BottomNav />
    </div>
  );
}

