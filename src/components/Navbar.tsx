import {
  Home,
  Users,
  Bookmark,
  Video,
  Shield,
  QrCode,
  Menu,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type Role = "SUPERADMIN" | "ADMIN" | "PATIENT";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("");
  const [role, setRole] = useState<Role>("PATIENT");

  useEffect(() => {
    const storedRole = localStorage.getItem("role") as Role;
    if (storedRole) setRole(storedRole);
    setActive(location.pathname);
  }, [location.pathname]);

  const handleNavigate = (path: string) => {
    if (path === "/login") {
      localStorage.clear();
    }
    setActive(path);
    navigate(path);
  };

  const IconBtn = ({
    icon,
    label,
    path,
  }: {
    icon: React.ReactNode;
    label: string;
    path: string;
  }) => (
    <button
      onClick={() => handleNavigate(path)}
      className={`flex flex-col items-center justify-center flex-1 py-2 transition ${
        active === path ? "text-blue-600" : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-[11px] mt-1 leading-none">{label}</span>
    </button>
  );

  const getMenuByRole = () => {
    switch (role) {
      case "SUPERADMIN":
        return [
          { icon: <Home size={20} />, label: "Home", path: "/home" },
          { icon: <Shield size={20} />, label: "Moderate", path: "/moderation-panel" },
          { icon: <Users size={20} />, label: "Users", path: "/patient-management" },
          { icon: <QrCode size={20} />, label: "Survey", path: "/survey" },
          { icon: <Menu size={20} />, label: "Menu", path: "/role-based" },
        ];

      case "ADMIN":
        return [
          { icon: <Home size={20} />, label: "Home", path: "/home" },
          { icon: <Shield size={20} />, label: "Moderate", path: "/moderation-panel-admin" },
          { icon: <QrCode size={20} />, label: "Survey", path: "/survey-admin" },
          { icon: <Menu size={20} />, label: "Menu", path: "/menu" },
        ];

      default: // PATIENT
        return [
          { icon: <Home size={20} />, label: "Home", path: "/home" },
          { icon: <Bookmark size={20} />, label: "Saved", path: "/saved-posts" },
          { icon: <Video size={20} />, label: "Stories", path: "/success-stories" },
          { icon: <Users size={20} />, label: "Profile", path: "/profile" },
          { icon: <LogOut size={20} />, label: "Logout", path: "/login" },
        ];
    }
  };

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-white border-t border-gray-200
        h-16
        pb-safe
        md:hidden
      "
    >
      <div className="flex h-full">
        {getMenuByRole().map((item) => (
          <IconBtn
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
          />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
