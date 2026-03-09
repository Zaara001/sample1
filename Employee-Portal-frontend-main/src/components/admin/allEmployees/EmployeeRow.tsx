import StatusBadge from "./StatusBadge";
import AttendanceProgress from "./AttendanceProgress";
import type { Employee } from "../../../types/employee";

interface Props {
  employees: Employee[];
  view: "active" | "inactive";
}

const EmployeeRow = ({ employees, view }: Props) => {
  return (
    <>
      {employees.map((emp) => (
        <tr key={emp.employeeId} className="border-t">
          {/* Employee */}
          <td className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 text-white font-semibold">
                {emp.name?.charAt(0) || "?"}
              </div>
              <div>
                <p className="font-medium text-sm">{emp.name}</p>
                <p className="text-xs text-gray-500">{emp.employeeId}</p>
              </div>
            </div>
          </td>

          {/* Department */}
          <td className="p-2 text-sm">{emp.department}</td>

          {/* ✅ Only for ACTIVE */}
          {view === "active" && (
            <>
              <td className="p-2 text-sm">
                <StatusBadge status={emp.status} />
              </td>

              <td className="p-3 text-sm">{emp.checkIn || "—"}</td>

              <td className="p-3 text-sm">{emp.checkOut || "—"}</td>

              <td className="p-3 text-sm">
                <AttendanceProgress percentage={emp.attendance || 0} />
              </td>

              <td className="p-3 text-sm">{emp.avgHours || "—"}</td>
            </>
          )}

          {/* Account */}
          <td className="p-3 text-sm">
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                emp.account === "Active"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {emp.account}
            </span>
          </td>

          {/* Action */}
          <td className="p-3 text-sm">
            <button className="px-3 py-1 bg-gray-100 rounded-lg text-gray-600 text-sm">
              View
            </button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default EmployeeRow;
