import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/Button";
import { Video, Image, FileText, X } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { createPost } from "@/api/api";
import defaultAvatar from "@/assets/default-avatar.jpg";

const PostComposer = ({ onPost }) => {
  const { user } = useUser();
  const [showInput, setShowInput] = useState(false);
  const [postText, setPostText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const [userData, setUserData] = useState({
    imageUrl: "",
    firstname: "",
  });

  const extractYouTubeId = (url: string) => {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:shorts\/|watch\?v=|embed\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
      setShowInput(true);
    }
  };

  // Convert createdAt → "x min ago", "2 hours ago", etc.
  const formatTimeAgo = (timestamp: string | number | Date) => {
    const created = new Date(timestamp);

    if (isNaN(created.getTime())) {
      return "Unknown time"; // If timestamp is invalid
    }

    const now = new Date().getTime();
    const createdTime = created.getTime();

    const seconds = Math.floor((now - createdTime) / 1000);

    if (seconds < 60) return "Just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hour ago`;
    if (seconds < 172800) return "Yesterday";

    const days = Math.floor(seconds / 86400);
    return `${days} days ago`;
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        setUserData({
          imageUrl: localStorage.getItem("imageUrl") || "",
          firstname: localStorage.getItem("firstname") || "",
        });
      } catch (err: any) {
        console.error("Error loading profile:", err);
        setError(err.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  const handlePost = async () => {
    if (!postText && !file && !youtubeLink) {
      alert("Please add text, media, or a YouTube link before posting!");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        alert("User not authenticated!");
        setLoading(false);
        return;
      }

      const youtubeVideo = extractYouTubeId(youtubeLink) || "";

      const postDto = {
        text: postText,
        userId,
        youtubeVideo,
        userConsent: "Public",
      };

      // ✅ Call central API
      const result = await createPost(postDto, file, token);

      // ✅ Construct media URLs
      const mediaUrls =
        result.mediaUrlList?.map((m) => ({
          url: m.url,
          type: m.type,
        })) ||
        (file
          ? [
              {
                url: preview,
                type: file.type.startsWith("video") ? "video" : "image",
              },
            ]
          : []);

      const newPost = {
        id: result.id,
        authorUserId: result.user.id,
        author: `${result.user.firstName} ${result.user.lastName}`,
        accountName: result.user.accountName,
        createdAt: result.createdAt,
        timeAgo: formatTimeAgo(result.createdAt),
        content: result.text,
        authorImage: result.user.imageUrl,
        likes: 0,
        comments: 0,
        mediaUrls,
        youtubeVideo: result.youtubeVideo || null,
      };

      onPost(newPost);

      // Reset form
      setPostText("");
      setFile(null);
      setPreview(null);
      setYoutubeLink("");
      setShowInput(false);
    } catch (error) {
      console.error("Error posting:", error);
      alert(
        error.response?.data?.message || "Something went wrong while posting!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        {/* Avatar + Input */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-16 h-16 overflow-hidden bg-gray-200">
            {userData.imageUrl ? (
              <AvatarImage
                src={userData.imageUrl}
                className="transition-all duration-500 blur-0 opacity-100"
              />
            ) : (
              <img
                src={defaultAvatar}
                alt="Default profile"
                className="w-full h-full object-cover"
              />
            )}
          </Avatar>

          <button
            onClick={() => setShowInput(true)}
            className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Start a post...
          </button>
        </div>

        {/* Post Box */}
        {showInput && (
          <div className="border rounded-lg p-3 bg-gray-50 mb-3">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What do you want to talk about?"
              rows={3}
              className="w-full resize-none border-none focus:ring-0 bg-transparent outline-none text-gray-700"
            />

            {/* YouTube Input */}
            {youtubeLink && (
              <div className="mt-3">
                <iframe
                  className="w-full rounded-md"
                  height="250"
                  src={`https://www.youtube.com/embed/${
                    extractYouTubeId(youtubeLink) || ""
                  }`}
                  title="YouTube video preview"
                  allowFullScreen
                ></iframe>
                <button
                  onClick={() => setYoutubeLink("")}
                  className="mt-1 flex text-sm text-red-500 hover:underline"
                >
                  <X className="h-4 w-4 mr-1" /> Remove YouTube link
                </button>
              </div>
            )}

            {/* Image/Video Preview */}
            {preview && (
              <div className="relative mt-2">
                {file?.type.startsWith("video") ? (
                  <video
                    src={preview}
                    controls
                    className="rounded-md max-h-64 object-cover w-full"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="preview"
                    className="rounded-md max-h-64 object-cover w-full"
                  />
                )}
                <button
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                  className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            )}

            <div className="flex justify-end mt-3">
              <Button onClick={handlePost} disabled={loading}>
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Options */}
        <div className="flex items-center justify-between pt-2">
          <label
            htmlFor="videoUpload"
            className="flex items-center space-x-2 text-blue-600 hover:bg-blue-50 cursor-pointer px-2 py-1 rounded-md"
          >
            <Video className="h-5 w-5" />
            <span className="hidden md:inline">Video</span>
            <input
              id="videoUpload"
              type="file"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <label
            htmlFor="imageUpload"
            className="flex items-center space-x-2 text-green-600 hover:bg-green-50 cursor-pointer px-2 py-1 rounded-md"
          >
            <Image className="h-5 w-5" />
            <span className="hidden md:inline">Photo</span>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          <Button
            variant="ghost"
            onClick={() => {
              const link = prompt("Paste your YouTube link:");
              if (link) setYoutubeLink(link.trim());
              setShowInput(true);
            }}
            className="flex items-center space-x-2 text-orange-600 hover:bg-orange-50"
          >
            <FileText className="h-5 w-5" />
            <span className="hidden md:inline">YouTube Post</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostComposer;
