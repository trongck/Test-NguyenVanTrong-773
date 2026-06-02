"use client";

import { useState, useCallback } from "react";
import { mockVideos } from "@/models/data";
import { VideoInteraction } from "@/models/types";

export function useVideoFeed() {
  const [interactions, setInteractions] = useState<Record<string, VideoInteraction>>(() => {
    const init: Record<string, VideoInteraction> = {};
    mockVideos.forEach((v) => {
      init[v.id] = { isLiked: false, likesCount: v.likesCount };
    });
    return init;
  });

  const toggleLike = useCallback((videoId: string) => {
    setInteractions((prev) => {
      const cur = prev[videoId];
      if (!cur) return prev;
      return {
        ...prev,
        [videoId]: {
          isLiked: !cur.isLiked,
          likesCount: cur.isLiked ? cur.likesCount - 1 : cur.likesCount + 1,
        },
      };
    });
  }, []);

  return { videos: mockVideos, interactions, toggleLike };
}
