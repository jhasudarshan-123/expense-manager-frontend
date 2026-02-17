import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import {
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Bookmark,
  Send,
  Check,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import defaultAvatar from "@/assets/default-avatar.jpg";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  getCommentsByPostId,
  addComment,
  likePost,
  savePost,
  followUser,
  unfollowUser,
} from "@/api/api";

/* ---------------- TYPES ---------------- */
interface MediaUrl {
  type: string;
  url: string;
}

interface CommentType {
  id?: string;
  text: string;
  createdAt?: string;
  firstName: string;
  lastName: string;
  authorImage?: string;
}

interface PostProps {
  id: string;
  author: string;
  timeAgo: string;
  content: string;
  authorImage?: string;
  accountName?: string;
  mediaUrls?: MediaUrl[];
  postLiked?: boolean;
  likeCount?: number;
  commentCount?: number;
  authorUserId: string;
  isFollowingAuthor?: boolean;
  youtubeVideo?: string;
}

/* ---------------- COMPONENT ---------------- */
const Post = ({
  id,
  author,
  timeAgo,
  content,
  authorImage,
  accountName,
  mediaUrls = [],
  postLiked = false,
  likeCount: initialLikeCount = 0,
  commentCount: initialCommentCount = 0,
  authorUserId,
  isFollowingAuthor = false,
  youtubeVideo,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState(postLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [commentCount, setCommentCount] = useState(initialCommentCount);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isFollowing, setIsFollowing] = useState(isFollowingAuthor);
  const [expanded, setExpanded] = useState(false);
  const [postComments, setPostComments] = useState<CommentType[]>([]);

  const currentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const isOwnPost = currentUserId === authorUserId;

  /* ---------------- ACTIONS ---------------- */
  const handleLike = async () => {
    if (!currentUserId || !token) return;
    const res = await likePost(currentUserId, id, token);
    if (res?.isLiked) {
      setIsLiked(true);
      setLikeCount((p) => p + 1);
    } else {
      setIsLiked(false);
      setLikeCount((p) => p - 1);
    }
  };

  const youtubeEmbedUrl = youtubeVideo
    ? `https://www.youtube.com/embed/${youtubeVideo}`
    : null;

  const handleFollow = async () => {
    if (!token || isOwnPost) return;
    if (isFollowing) {
      await unfollowUser(currentUserId!, authorUserId, token);
      setIsFollowing(false);
    } else {
      await followUser(currentUserId!, authorUserId, token);
      setIsFollowing(true);
    }
  };

  const formatTimeAgo = (dateString?: string) => {
    if (!dateString) return "Just now";

    // Treat the DB timestamp as UTC
    const utcString = dateString.replace(" ", "T") + "Z";
    const date = new Date(utcString);
    const now = new Date();

    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = [
      { label: "y", seconds: 31536000 }, // 365 * 24 * 60 * 60
      { label: "m", seconds: 2592000 }, // 30 * 24 * 60 * 60
      { label: "w", seconds: 604800 }, // 7 * 24 * 60 * 60
      { label: "d", seconds: 86400 }, // 24 * 60 * 60
      { label: "hr", seconds: 3600 }, // 60 * 60
      { label: "min", seconds: 60 },
      { label: "sec", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "Just now";
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !token || !currentUserId) return;

    const saved = await addComment(
      { postId: id, userId: currentUserId, text: newComment },
      token
    );

    setComments((p) => [...p, saved]);
    setCommentCount((p) => p + 1);
    setNewComment("");
  };

  useEffect(() => {
    if (!showComments) return;

    const load = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const data = await getCommentsByPostId(id, token);

      const mapped = data.map((c: any) => ({
        id: c.id,
        text: c.text,
        createdAt: c.createdAt,
        userId: c.userId,
        postId: c.postId,
        firstName: c.user?.firstName || "",
        lastName: c.user?.lastName || "",
        authorImage: c.user?.imageUrl,
      }));

      setPostComments(mapped);
    };

    load();
  }, [showComments, id]);

  /* ---------------- UI ---------------- */
  return (
    <Card className="rounded-none border-x-0 md:rounded-xl md:border">
      <CardContent className="p-0">
        {/* ---------- HEADER ---------- */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9">
              <AvatarImage src={authorImage || defaultAvatar} />
            </Avatar>

            <div>
              <p className="text-sm font-semibold">{accountName}</p>
              <p className="text-xs text-gray-500">{formatTimeAgo(timeAgo)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isOwnPost && (
              <button
                onClick={handleFollow}
                className="text-sm font-semibold text-blue-600"
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => savePost(id, token!)}>
                  <Bookmark className="h-4 w-4 mr-2" /> Save
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" /> Share
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ---------- CONTENT ---------- */}
        {/* ---------- CONTENT ---------- */}
        {content && (
          <div className="px-4 pb-2 text-sm">
            <div
              className={`relative ${expanded ? "" : "line-clamp-3"}`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content),
              }}
            />

            {/* SHOW MORE / LESS */}
            {content.length > 120 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-1 text-gray-500 text-sm font-medium"
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            )}
          </div>
        )}

        {/* ---------- MEDIA ---------- */}
        {mediaUrls.length > 0 && (
          <div className="w-full">
            {mediaUrls.map((m, i) =>
              m.type === "video" ? (
                <video key={i} controls className="w-full max-h-[480px]">
                  <source src={m.url} />
                </video>
              ) : (
                <img
                  key={i}
                  src={m.url}
                  className="w-full max-h-[520px] object-cover"
                />
              )
            )}
          </div>
        )}

        {/* ---------- YOUTUBE VIDEO ---------- */}
        {youtubeEmbedUrl && (
          <div className="w-full mt-2 aspect-video bg-black">
            <iframe
              src={youtubeEmbedUrl}
              title="YouTube video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* ---------- ACTION BAR ---------- */}
        <div className="flex justify-between items-center px-4 py-3">
          <div className="flex gap-5">
            <button onClick={handleLike}>
              <Heart
                className={`h-6 w-6 ${
                  isLiked ? "fill-red-500 text-red-500" : ""
                }`}
              />
            </button>
          </div>
          <button onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>

        {/* ---------- COUNTS ---------- */}
        <div className="px-4 text-sm font-semibold">{likeCount} likes</div>

        <div
          className="px-4 text-sm text-gray-500 cursor-pointer pb-2"
          onClick={() => setShowComments(!showComments)}
        >
          View all {commentCount} comments
        </div>

        {/* ---------- COMMENTS ---------- */}
        {showComments && (
          <div className="px-4 pb-3 space-y-2">
            {postComments.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                {/* Avatar */}
                <img
                  src={c.authorImage || defaultAvatar} // ✅ ab hamesha show hoga
                  alt={`${c.firstName} ${c.lastName}`}
                  className="w-8 h-8 rounded-full object-cover"
                />

                {/* Comment content */}
                <div className="bg-gray-100 rounded-lg p-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">
                      {c.firstName} {c.lastName}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatTimeAgo(c.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{c.text}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-2 mt-2">
              <Input
                placeholder="Add a comment…"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button size="icon" onClick={handleAddComment}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
