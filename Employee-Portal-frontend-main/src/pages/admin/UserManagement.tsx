import { useEffect, useState } from "react";
import UserStats from "../../components/admin/userManagement/UserStats";
import UserTabs from "../../components/admin/userManagement/UserTabs";
import UserFilters from "../../components/admin/userManagement/UserFilters";
import UserTable from "../../components/admin/userManagement/UserTable";

export interface User {
  employeeId: string;
  name: string;
  department: string;
  status: string;
  checkIn: string | null;
  checkOut: string | null;
  attendance: number;
  avgHours: string;
  account: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/employees"); // 👈 your API
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <UserStats users={users} />
      <UserTabs users={users} />
      <UserFilters />
      <UserTable users={users} />
    </div>
  );
};

export default UserManagementPage;
