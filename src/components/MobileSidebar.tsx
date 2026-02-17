import Navigation from "@/components/Navigation";
import RoleBasedUserProfile from "@/components/RoleBasedUserProfile";
import NewsFeed from "@/components/NewsFeed";
import { X } from "lucide-react";

const MobileSidebar = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40">
      <div className="absolute left-0 top-0 h-full w-72 bg-white p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Menu</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <RoleBasedUserProfile />
        <Navigation />

        <div className="mt-6">
          <NewsFeed />
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
