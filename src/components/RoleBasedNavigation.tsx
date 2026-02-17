
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Users, Bookmark, Video, QrCode, Shield, Home, Settings } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const RoleBasedNavigation = () => {
  const location = useLocation();
  const { user } = useUser();

  if (!user) return null;

  const getNavigationItems = () => {
    switch (user.role) {
      case 'superadmin':
        return [
          { path: "/home", icon: Home, label: "Dashboard" },
          { path: "/survey", icon: QrCode, label: "Survey" },
          { path: "/moderation-panel", icon: Shield, label: "Moderation Panel" },
          { path: "/patient-management", icon: Shield, label: "User Management" },
        ];
      
      case 'admin':
        return [
          { path: "/home", icon: Home, label: "Dashboard" },
          { path: "/survey", icon: QrCode, label: "Survey" },
          { path: "/moderation-panel", icon: Shield, label: "Moderation Panel" },
        ];
      
      case 'patient':
        return [
          { path: "/home", icon: Home, label: "Dashboard" },
          { path: "/saved-posts", icon: Bookmark, label: "Saved Posts" },
          { path: "/success-stories", icon: Video, label: "My Success Stories" },
          { path: "/community", icon: Users, label: "Community" },
        ];
      
      default:
        return [];
    }
  };

  const navItems = getNavigationItems();

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
            <item.icon className="h-5 w-5" />   {/* Icon will render here */}
            <span className="hidden md:block">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  </nav>
);

};

export default RoleBasedNavigation;
