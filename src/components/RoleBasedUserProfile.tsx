import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { fetchAllProfileCounts } from "../api/api";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "@/assets/default-avatar.jpg";

const RoleBasedUserProfile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    accountName: "",
    role: "",
    firstName: "",
    lastName: "",
    imageUrl: "",
  });

  const [counts, setCounts] = useState({
    followerCount: 0,
    followingCount: 0,
    postCount: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    // 🔥 USER DATA FROM LOCALSTORAGE
    setUserData({
      accountName: localStorage.getItem("accountName") || "",
      role: localStorage.getItem("role") || "USER",
      firstName: localStorage.getItem("firstname") || "",
      lastName: localStorage.getItem("lastname") || "",
      imageUrl: localStorage.getItem("imageUrl") || "",
    });

    // 🔥 COUNTS API (only if USER)
    const loadCounts = async () => {
      try {
        if (localStorage.getItem("role") === "USER") {
          const countsData = await fetchAllProfileCounts(token);
          setCounts(countsData);
        }
      } catch (err) {
        console.error("Error loading counts", err);
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, [navigate]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-20 h-20 overflow-hidden bg-gray-200" onClick={() => navigate("/user-profile")}>
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

          <div className="flex-1">
            <h3 className="font-semibold text-2xl">
              {userData.firstName} {userData.lastName}
            </h3>

            <p className="text-gray-600 text-xl">
              @{userData.accountName}
            </p>

            <Badge variant="secondary" className="mt-1 text-md">
              {userData.role}
            </Badge>
          </div>
        </div>

        {userData.role === "USER" && (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-semibold text-lg">
                {loading ? "..." : counts.postCount}
              </div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>

            <div>
              <div className="font-semibold text-lg">
                {loading ? "..." : counts.followerCount}
              </div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>

            <div>
              <div className="font-semibold text-lg">
                {loading ? "..." : counts.followingCount}
              </div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleBasedUserProfile;
