import EmployeeRow from "./EmployeeRow";
import type { Employee } from "../../../types/employee";

interface Props {
  employees: Employee[];
  view: "active" | "inactive";
}

const EmployeeTable = ({ employees, view }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-500 text-xs">
          <tr>
            <th className="py-3 pl-6 text-left">EMPLOYEE</th>
            <th className="p-3 text-left">DEPT</th>

            {view === "active" && (
              <>
                <th className="p-3 text-left">TODAY STATUS</th>
                <th className="p-3 text-left">CHECK IN</th>
                <th className="p-3 text-left">CHECK OUT</th>
                <th className="p-3 text-left">ATTENDANCE</th>
                <th className="p-3 text-left">AVG HOURS</th>
              </>
            )}

            <th className="p-3 text-left">ACCOUNT</th>
            <th className="p-3 text-left">ACTION</th>
          </tr>
        </thead>

        <tbody>
          <EmployeeRow employees={employees} view={view} />
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
