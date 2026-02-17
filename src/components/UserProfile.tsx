import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAllProfileCounts } from "../api/api";

const UserProfile = () => {
  const [userData, setUserData] = useState({
    accountName: "",
    role: "",
  });

  const [counts, setCounts] = useState({
    followerCount: 0,
    followingCount: 0,
    postCount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);

        // ✅ Get user info from localStorage
        const storedAccountName = localStorage.getItem("accountName");
        const storedRole = localStorage.getItem("role");
        const token = localStorage.getItem("token");

        if (!token) throw new Error("Authentication token not found");

        setUserData({
          accountName: storedAccountName || "Member",
          role: storedRole || "Patient",
        });

        // ✅ Fetch follower/following/post counts
        const countsData = await fetchAllProfileCounts(token);
        setCounts(countsData || {});
        setError(null);
      } catch (err: any) {
        console.error("Error loading profile:", err);
        setError(err.message || "Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, []);

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="text-center">
          {/* ✅ Profile banner and avatar */}
          <div className="w-full h-32 bg-gradient-to-r from-primary to-primary/80 rounded-lg mb-4 relative">
            <Avatar className="w-16 h-16 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 border-4 border-white">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-white">
                {userData.accountName
                  ? userData.accountName.slice(0, 2).toUpperCase()
                  : "U"}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* ✅ User info */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg">{userData.accountName}</h3>
            <p className="text-gray-600 text-sm">{userData.role}</p>
          </div>

          {/* ✅ Error message */}
          {error && (
            <div className="mt-4 text-sm text-red-500">{error}</div>
          )}

          {/* ✅ Follower / Following / Posts section */}
          <div className="flex justify-around mt-6 text-center">
            <div>
              <div className="font-semibold text-primary">
                {loading ? "..." : counts.followerCount ?? 0}
              </div>
              <div className="text-sm text-gray-600">Followers</div>
            </div>
            <div>
              <div className="font-semibold text-primary">
                {loading ? "..." : counts.followingCount ?? 0}
              </div>
              <div className="text-sm text-gray-600">Following</div>
            </div>
            <div>
              <div className="font-semibold text-primary">
                {loading ? "..." : counts.postCount ?? 0}
              </div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
