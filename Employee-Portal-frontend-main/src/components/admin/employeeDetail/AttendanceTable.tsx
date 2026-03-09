import type { AttendanceRecord } from "../../../types/employee.ts";
import StatusBadge from "./StatusBadge";

interface Props {
  data: AttendanceRecord[];
}

const AttendanceTable = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Attendance Detail — February 2026
      </h3>

      <table className="w-full">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="py-3 text-left">DATE</th>
            <th>DAY</th>
            <th>CHECK IN</th>
            <th>CHECK OUT</th>
            <th>HOURS</th>
            <th>STATUS</th>
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b text-sm">
              <td className="py-3">{row.date}</td>
              <td>{row.day}</td>
              <td>{row.checkIn || "—"}</td>
              <td>{row.checkOut || "—"}</td>
              <td>{row.hours || "—"}</td>
              <td>
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;