import StatusBadge from "./StatusBadge";
import RoleBadge from "./RoleBadge";
import type { Employee } from "../../../types/employee";

interface Props {
  users: Employee[];
}

const UserTable = ({ users }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="py-3 text-left">USER</th>
            <th>EMPLOYEE ID</th>
            <th>DEPARTMENT</th>
            <th>AUTH TYPE</th>
            <th>ROLE</th>
            <th>LAST LOGIN</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-b">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    {u.name?.slice(0, 2)}
                  </div>
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-gray-500 text-xs">
                      {u.employeeId}@company.com
                    </p>
                  </div>
                </div>
              </td>

              <td>{u.employeeId}</td>
              <td>{u.department}</td>
              <td>LDAP</td>

              <td>
                <RoleBadge role="Employee" />
              </td>

              <td>{u.checkIn || "—"}</td>

              <td>
                <StatusBadge
                  status={
                    u.account === "Active"
                      ? "Active"
                      : u.account === "Inactive"
                        ? "Inactive"
                        : "Pending"
                  }
                />
              </td>

              <td className="space-x-2">
                <button className="border px-3 py-1 rounded-lg">👁</button>
                <button className="border px-3 py-1 rounded-lg">🔒</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* keep your pagination SAME */}
    </div>
  );
};

export default UserTable;
