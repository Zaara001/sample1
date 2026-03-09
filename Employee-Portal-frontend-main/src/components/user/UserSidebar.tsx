import React from "react";
import {
  Home,
  CalendarDays,
  BarChart3,
  LineChart,
  User,
  Settings,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: <Home size={20} />,
    path: "/employee/dashboard",
  },
  {
    name: "Daily Attendance",
    icon: <CalendarDays size={20} />,
    path: "/employee/daily-attendance",
  },
  {
    name: "Monthly Report",
    icon: <BarChart3 size={20} />,
    path: "/employee/monthly-report",
  },
  {
    name: "Analytics",
    icon: <LineChart size={20} />,
    path: "/employee/analytics",
  },
];

const accountItems = [
  {
    name: "My Profile",
    icon: <User size={20} />,
    path: "/employee/profile",
  },
  {
    name: "Settings",
    icon: <Settings size={20} />,
    path: "/employee/settings",
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen w-64 bg-[#0f172a] text-white flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6">
          <div className="bg-blue-500 p-2 rounded-xl text-xl">👋</div>
          <div>
            <h1 className="text-lg font-semibold">AttendX</h1>
            <p className="text-xs text-gray-400">My Portal</p>
          </div>
        </div>

        {/* Menu */}
        <div className="mt-8">
          <p className="px-6 text-xs text-gray-400 mb-4">MENU</p>

          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-3 mb-2 transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Account Section */}
        <div className="mt-6">
          <p className="px-6 text-xs text-gray-400 mb-4">ACCOUNT</p>

          {accountItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg mx-3 mb-2 transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom User Card */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl">
          <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full font-semibold">
            JD
          </div>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-400">Employee · Engineering</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
