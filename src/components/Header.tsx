import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { LogOut, Menu } from "lucide-react";
import { logoutUser } from "@/api/api";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const userId = localStorage.getItem("userId"); // UUID stored after login

      if (userId) {
        await logoutUser(userId); // 🔥 BACKEND LOGOUT CALL
      }

      // 🧹 Frontend cleanup
      localStorage.clear();
      sessionStorage.clear();

      // 🚀 Redirect to login
      navigate("/login");

    } catch (error) {
      console.error("Logout failed:", error);

      // ❗ Even if API fails, force logout
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-primary/80 text-white p-4 shadow-md backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto flex items-center justify-between">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-6 w-6" />
          </button>

          <Link
            to="/home"
            className="text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            <span className="text-secondary">Unify</span>Patients
          </Link>
        </div>

        {/* RIGHT */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-white hover:bg-white/20 flex items-center space-x-2"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>

      </div>
    </header>
  );
};

export default Header;
