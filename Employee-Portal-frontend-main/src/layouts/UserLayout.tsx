import { Navigate, Outlet } from "react-router-dom";
import UserSidebar from "../components/user/UserSidebar";
import UserTopNavbar from "../components/user/UserTopNavbar";

const UserLayout = () => {
  const token = localStorage.getItem("token");

  // 🔒 BLOCK ACCESS
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <UserSidebar />

      <div className="flex-1 flex flex-col">
        <UserTopNavbar title="Employee Portal" />

        <div className="flex-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
