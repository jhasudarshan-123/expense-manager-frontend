import { Search, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "@/assets/default-avatar.jpg";

const TopHeader = () => {
  const [userImage, setUserImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUserImage(localStorage.getItem("imageUrl") || "");
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
      <div
        className="
          h-14
          md:h-16
          px-3
          md:px-6
          flex
          items-center
          gap-3
          max-w-[1600px]
          mx-auto
        "
      >
        {/* Avatar */}
        <img
          src={userImage || defaultAvatar}
          onClick={() => navigate("/profile")}
          className="
            w-9 h-9 md:w-10 md:h-10
            rounded-full object-cover
            cursor-pointer
            active:scale-95
          "
          alt="Profile"
        />

        {/* Search */}
        <div className="flex-1">
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 md:py-2">
            <Search size={16} className="text-gray-500" />
            <input
              placeholder="Search"
              className="bg-transparent outline-none px-2 text-sm w-full"
            />
          </div>
        </div>

        {/* Chat */}
        <button
          className="
            w-9 h-9 md:w-10 md:h-10
            rounded-full bg-gray-100
            flex items-center justify-center
            active:scale-95 transition
          "
        >
          <MessageCircle size={18} className="text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default TopHeader;
