import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Bookmark, Video, QrCode, Shield, User, Users } from "lucide-react";
import { FaSpa, FaShieldAlt, FaClipboardCheck } from "react-icons/fa";

const Navigation = () => {
  const location = useLocation();
  const [userData, setUserData] = useState({
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 👉 navItems should be declared ONCE
  let navItems: { path: string; icon: any; label: string }[] = [];

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const storedRole = localStorage.getItem("role");
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        setUserData({
          role: storedRole || "USER",
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

  // SUPERADMIN
  if (userData.role === "SUPERADMIN") {
    navItems = [
      {
        path: "/survey",
        icon: QrCode,
        label: "Survey",
      },

      {
        path: "/moderation-panel",
        icon: FaShieldAlt, // better than FaSpa here
        label: "Moderation Panel",
      },

      {
        path: "/wellness-centre-management",
        icon: FaSpa,
        label: "Wellness Centers",
      },

      {
        path: "/patient-management",
        icon: Users,
        label: "User Management",
      },
    ];
  }

  // ADMIN
  if (userData.role === "ADMIN") {
    navItems = [
      { path: "/survey-admin", icon: QrCode, label: "Survey" },
      {
        path: "/moderation-panel-admin",
        icon: FaShieldAlt, // better than FaSpa here
        label: "Moderation Panel",
      },
    ];
  }

  // NORMAL USER
  if (userData.role === "USER") {
    navItems = [
      { path: "/saved-posts",
      icon: Bookmark,
      label: "My Posts",},
      { path: "/success-stories",
      icon: Video,
      label: "My Success Stories", },
    ];
  }

  return (
    <nav className="bg-white border-r border-gray-200 w-full">
      <div className="p-4">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
