"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { VideoData, VideoInteraction } from "@/models/types";

interface Props {
  video: VideoData;
  interaction: VideoInteraction;
  onToggleLike: (id: string) => void;
  isActive: boolean;
}

function formatCount(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${n}`;
}

function VideoCard({ video, interaction, onToggleLike, isActive }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // 1. Điều khiển phát video dựa trên thuộc tính isActive tập trung
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    if (isActive) {
      el.play().catch(() => {
        // Phương án dự phòng nếu trình duyệt chặn tự động phát
        el.muted = true;
        setIsMuted(true);
        el.play().catch(() => {});
      });
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // 2. Dọn dẹp timer khi component unmount để tránh rò rỉ bộ nhớ
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // 3. Theo dõi tiến trình phát video
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const updateProgress = () => {
      if (el.duration) {
        setProgress((el.currentTime / el.duration) * 100);
      }
    };
    el.addEventListener("timeupdate", updateProgress);
    return () => el.removeEventListener("timeupdate", updateProgress);
  }, []);

  // Bật/tắt âm thanh
  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setIsMuted(el.muted);
  }, []);

  // Nhấp chuột để phát/tạm dừng video
  const togglePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    
    if (el.paused) {
      el.play().catch(() => {});
      setIsPlaying(true);
    } else {
      el.pause();
      setIsPlaying(false);
    }
    
    setShowIcon(true);
    
    // Xóa timer cũ nếu người dùng nhấn liên tục để tránh tranh chấp trạng thái
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setShowIcon(false);
    }, 600);
  }, []);

  return (
    <div 
      data-video-id={video.id}
      className="h-dvh w-full snap-start bg-[#080808] relative flex items-center justify-center lg:gap-8 overflow-hidden"
    >
      {/* Khung chứa khung hình video và các thành phần di động */}
      <div 
        className="relative flex items-center justify-center transition-all duration-300 ease-out
          w-[min(100vw,calc(100vh*9/16))] 
          h-[min(100vh,calc(100vw*16/9))]
          lg:w-auto lg:h-[94%] lg:aspect-[9/16]"
      >
        {/* Khung hình video: bo tròn góc xung quanh để có giao diện cao cấp */}
        <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/[0.03] bg-black">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover cursor-pointer"
            src={video.videoUrl}
            loop
            playsInline
            // Tối ưu hóa băng thông: Chỉ tải trước toàn bộ video khi nó đang active hoặc chuẩn bị active
            preload={isActive ? "auto" : "metadata"}
            onClick={togglePlay}
          />

          {/* Nút loa bật/tắt tiếng (Góc trên bên phải) */}
          <button 
            onClick={toggleMute}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/45 border border-white/10 hover:bg-black/70 flex items-center justify-center text-white/90 z-30 transition-all duration-150 active:scale-90 shadow-md backdrop-blur-md"
            aria-label={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>

          {/* Các lớp phủ gradient tối mềm mại */}
          <div className="absolute top-0 inset-x-0 h-[20%] bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

          {/* Hiệu ứng biểu tượng phát/tạm dừng */}
          {showIcon && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
              <div className="text-white/90 animate-fade-scale bg-black/40 p-5 rounded-full backdrop-blur-md shadow-2xl">
                {isPlaying ? (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                ) : (
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                )}
              </div>
            </div>
          )}

          {/* Thông tin tác giả & mô tả: bottom-20 trên mobile để không bị đè bởi thanh điều hướng */}
          <div className="absolute bottom-20 lg:bottom-6 left-5 right-20 text-white z-10 flex flex-col gap-1.5 pointer-events-none">
            <p className="text-[15px] font-bold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {video.authorName}
            </p>
            <p className="text-[13.5px] leading-relaxed text-white/95 font-normal drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] line-clamp-2">
              {video.description}
            </p>
          </div>

          {/* Thanh tiến trình mỏng màu hồng/đỏ */}
          <div className="absolute bottom-14 lg:bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
            <div 
              className="h-full bg-[#fe2c55] transition-all duration-100 ease-out" 
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Thanh tương tác trên Di động (Nằm bên trong video) */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 lg:hidden z-20">
            <ActionBar video={video} interaction={interaction} onToggleLike={onToggleLike} />
          </div>
        </div>
      </div>

      {/* Thanh tương tác trên PC (Nằm ngoài video, hiển thị lơ lửng) */}
      <div className="hidden lg:flex self-center z-20">
        <ActionBar video={video} interaction={interaction} onToggleLike={onToggleLike} />
      </div>
    </div>
  );
}

// Tách biệt cấu trúc Action Bar thành component riêng để tránh lặp DOM và tối ưu tài nguyên
const ActionBar = React.memo(({ 
  video, 
  interaction, 
  onToggleLike 
}: { 
  video: VideoData; 
  interaction: VideoInteraction; 
  onToggleLike: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center gap-5">
      {/* Avatar Tác giả */}
      <div className="relative flex flex-col items-center mb-1">
        <div className="w-11 h-11 rounded-full p-[1.5px] bg-white/30 backdrop-blur-md shadow-md">
          <div className="w-full h-full rounded-full bg-[#333] border border-white/10 flex items-center justify-center font-bold text-sm text-white overflow-hidden">
            <span className="bg-gradient-to-tr from-[#fe2c55] to-[#25f4ee] w-full h-full flex items-center justify-center text-xs">
              {video.authorName.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
        <button 
          className="absolute -bottom-1.5 w-5 h-5 rounded-full bg-[#fe2c55] hover:bg-[#e12248] text-white flex items-center justify-center border-2 border-black focus:outline-none transition-transform duration-100 active:scale-90 z-10 shadow-lg"
          aria-label="Theo dõi tác giả"
        >
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>

      {/* Nút Like (Tym) */}
      <button
        onClick={() => onToggleLike(video.id)}
        className="flex flex-col items-center gap-1.5 focus:outline-none transition-transform duration-150 active:scale-95 group"
        aria-label={interaction.isLiked ? "Bỏ thích video" : "Thích video"}
      >
        <div
          className={`w-[46px] h-[46px] rounded-full flex items-center justify-center shadow-lg transition-all duration-300 border border-white/[0.06] backdrop-blur-md
            ${interaction.isLiked
              ? "text-white bg-[#fe2c55] border-[#fe2c55] shadow-[#fe2c55]/20 animate-like-pop"
              : "text-white bg-[#161616]/75 hover:bg-black/90 hover:scale-105"
            }`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24"
            fill={interaction.isLiked ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={interaction.isLiked ? 0 : 2.5}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <span className={`text-[12px] font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors duration-200
          ${interaction.isLiked ? "text-[#fe2c55]" : "text-white/90"}`}
        >
          {formatCount(interaction.likesCount)}
        </span>
      </button>

      {/* Nút Bình Luận */}
      <button 
        className="flex flex-col items-center gap-1.5 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#25f4ee]"
        aria-label="Xem bình luận"
      >
        <div className="w-[46px] h-[46px] rounded-full bg-[#161616]/75 border border-white/[0.06] backdrop-blur-md flex items-center justify-center text-white/90 shadow-lg hover:bg-black/90 transition-all">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <circle cx="8" cy="12" r="1" fill="currentColor"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="16" cy="12" r="1" fill="currentColor"/>
          </svg>
        </div>
        <span className="text-[12px] font-bold text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          {formatCount(639)}
        </span>
      </button>

      {/* Nút Chia sẻ */}
      <button 
        className="flex flex-col items-center gap-1.5 focus:outline-none focus-visible:outline-2 focus-visible:outline-[#25f4ee]"
        aria-label="Chia sẻ video"
      >
        <div className="w-[46px] h-[46px] rounded-full bg-[#161616]/75 border border-white/[0.06] backdrop-blur-md flex items-center justify-center text-white/90 shadow-lg hover:bg-black/90 transition-all">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" y1="2" x2="12" y2="15" />
          </svg>
        </div>
        <span className="text-[12px] font-bold text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {formatCount(4400)}
        </span>
      </button>
    </div>
  );
});
ActionBar.displayName = "ActionBar";

export default React.memo(VideoCard);


