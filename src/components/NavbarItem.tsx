import { Link } from "react-router-dom";

const NavbarItem = ({
  to,
  icon,
  label,
  active = false,
  badge,
}: any) => {
  return (
    <Link
      to={to}
      className={`relative flex flex-col items-center px-3 py-1 text-xs ${
        active
          ? "text-black border-b-2 border-black"
          : "text-gray-600 hover:text-black"
      }`}
    >
      {/* Icon */}
      <div className="relative">
        {icon}
        {badge && (
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] px-1.5 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Label */}
      <span className="mt-0.5">{label}</span>
    </Link>
  );
};

export default NavbarItem;
