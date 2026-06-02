export interface VideoData {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
}

export interface VideoInteraction {
  isLiked: boolean;
  likesCount: number;
}



