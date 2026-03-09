import React from "react";

type ViewType = "active" | "inactive";

interface Props {
  view: ViewType;
  setView: (value: ViewType) => void;
  department: string;
  setDepartment: (value: string) => void;
  departments: string[];
  count: number;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
}

const EmployeesHeader = ({
  view,
  setView,
  department,
  setDepartment,
  departments,
  count,
  selectedDate,
  setSelectedDate,
}: Props) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-4">
        {/* Active / Inactive */}
        <select
          value={view}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setView(e.target.value as ViewType)
          }
          className="px-4 py-2 border rounded-lg bg-white"
        >
          <option value="active">Active Employees</option>
          <option value="inactive">Inactive Employees</option>
        </select>

        {/* Department */}
        <select
          value={department}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setDepartment(e.target.value)
          }
          className="px-4 py-2 border rounded-lg bg-white"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept === "all" ? "All Departments" : dept}
            </option>
          ))}
        </select>

        {/* ✅ DATE FILTER */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSelectedDate(e.target.value)
          }
          className="px-4 py-2 border rounded-lg bg-white"
        />

        {/* Clear Date */}
        <button
          onClick={() => setSelectedDate("")}
          className="px-4 py-2 border rounded-lg text-gray-600"
        >
          Clear
        </button>
      </div>

      <p className="text-gray-500">Showing {count} employees</p>
    </div>
  );
};

export default EmployeesHeader;
