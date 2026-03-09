import { useEffect, useState } from "react";

interface Attendance {
  name: string;
  department: string;
  checkIn: string | null;
  hours: string | null;
  status: string;
}

interface AttendanceResponse {
  dayStatus: "NO_DATA" | "IN_PROGRESS";
  data: Attendance[];
}

const LiveAttendanceTable = () => {
  const [response, setResponse] = useState<AttendanceResponse | null>(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      const res = await fetch(
        "http://localhost:5000/api/admin/attendance/today",
      );
      const json = await res.json();
      setResponse(json);
    };

    fetchAttendance();
  }, []);

  if (!response) {
    return <div className="bg-white p-6 rounded-2xl shadow-sm">Loading...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Live — Today's Attendance</h2>

      {/* ✅ NO DATA STATE */}
      {response.dayStatus === "NO_DATA" ? (
        <div className="text-center py-10 text-gray-500">
          No attendance records for today.
        </div>
      ) : (
        <table className="w-full text-sm">
          <thead className="text-gray-500">
            <tr>
              <th className="text-left py-2">Employee</th>
              <th>Department</th>
              <th>Check In</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(response.data) &&
              response.data.map((emp, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3">{emp.name}</td>
                  <td>{emp.department}</td>
                  <td>{emp.checkIn || "-"}</td>
                  <td>{emp.hours || "-"}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs 
                      ${
                        emp.status === "Present"
                          ? "bg-green-100 text-green-600"
                          : ""
                      }
                      ${
                        emp.status === "Late"
                          ? "bg-yellow-100 text-yellow-600"
                          : ""
                      }
                      ${
                        emp.status === "Absent" ? "bg-red-100 text-red-600" : ""
                      }
                    `}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LiveAttendanceTable;
