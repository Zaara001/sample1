
import { Search, Bell } from "lucide-react";

const AdminTopbar = () => {
  return (
    <div className="h-16 bg-white shadow-sm flex items-center justify-between px-6">
      <div>
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">
          Monday, Feb 17 2026
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-2.5 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search employee..."
            className="pl-9 pr-4 py-2 border rounded-lg text-sm focus:outline-none"
          />
        </div>

        <Bell className="cursor-pointer" />

        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
          AD
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;