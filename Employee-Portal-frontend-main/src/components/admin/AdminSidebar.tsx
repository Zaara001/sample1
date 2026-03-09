import React from "react";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  BarChart3,
  Settings,
  Bell,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/admin/dashboard",
  },
  {
    name: "All Employees",
    icon: <Users size={20} />,
    path: "/admin/employees",
  },
  {
    name: "Departments",
    icon: <Building2 size={20} />,
    path: "/admin/department-page",
  },
];

const reportItems = [
  {
    name: "Export Reports",
    icon: <FileText size={20} />,
    path: "/admin/export-report-page",
  },
  {
    name: "Analytics",
    icon: <BarChart3 size={20} />,
    path: "/admin/analytics",
  },
];

const managementItems = [
  {
    name: "User Management",
    icon: <Settings size={20} />,
    path: "/admin/user-management-page",
  },
  {
    name: "Alerts",
    icon: <Bell size={20} />,
    path: "/admin/alert-page",
    badge: "3",
  },
];

const AdminSidebar: React.FC = () => {
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
            <p className="text-xs text-gray-400">Admin Panel</p>
          </div>
        </div>

        {/* MENU Section */}
        <div className="mt-8">
          <p className="px-6 text-xs text-gray-400 mb-4">OVERVIEW</p>

          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center justify-between px-6 py-3 rounded-lg mx-3 mb-2 transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* REPORTS Section */}
        <div className="mt-6">
          <p className="px-6 text-xs text-gray-400 mb-4">REPORTS</p>

          {reportItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center justify-between px-6 py-3 rounded-lg mx-3 mb-2 transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* MANAGEMENT Section */}
        <div className="mt-6">
          <p className="px-6 text-xs text-gray-400 mb-4">MANAGEMENT</p>

          {managementItems.map((item, index) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={index}
                className={`flex items-center justify-between px-6 py-3 rounded-lg mx-3 mb-2 transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="text-sm">{item.name}</span>
                </div>

                {item.badge && (
                  <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Admin Card (Styled Same as Employee) */}
      <div className="px-4 pb-6">
        <div className="flex items-center gap-3 bg-slate-800 p-3 rounded-xl">
          <div className="bg-red-500 w-10 h-10 flex items-center justify-center rounded-full font-semibold">
            AD
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">HR Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
