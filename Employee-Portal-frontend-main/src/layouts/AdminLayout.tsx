import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";

const AdminLayout = () => {
  const token = localStorage.getItem("token");

  // 🔒 BLOCK ACCESS
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        <AdminTopbar />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
