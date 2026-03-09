import React from "react";
import { Search, Bell } from "lucide-react";

interface TopNavbarProps {
  title: string;
}

const TopNavbar: React.FC<TopNavbarProps> = ({ title }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between  p-4 bg-white">
      {/* Left Side */}
      <div className="flex">
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500 pt-1.5 pl-3">{today}</p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Notification */}
        <div className="relative cursor-pointer">
          <Bell size={22} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-semibold">
          JD
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
