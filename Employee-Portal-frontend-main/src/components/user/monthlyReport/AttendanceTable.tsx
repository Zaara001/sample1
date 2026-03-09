import StatusBadge from "./StatusBadge";

type StatusType = "Present" | "Late" | "Absent" | "Weekend";

interface AttendanceRow {
  id: number;
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  status: StatusType;
  note: string;
}

const AttendanceTable = () => {
  const data: AttendanceRow[] = [
    {
      id: 1,
      date: "Feb 2",
      day: "Mon",
      checkIn: "08:58",
      checkOut: "18:01",
      hours: "9h 03m",
      status: "Present",
      note: "—",
    },
    {
      id: 5,
      date: "Feb 6",
      day: "Fri",
      checkIn: "09:10",
      checkOut: "18:10",
      hours: "9h 00m",
      status: "Late",
      note: "+10 min",
    },
    {
      id: 0,
      date: "Feb 16",
      day: "Mon",
      checkIn: "—",
      checkOut: "—",
      hours: "—",
      status: "Absent",
      note: "—",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Detailed Attendance Log — February 2026
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Date</th>
              <th className="p-3">Day</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Working Hours</th>
              <th className="p-3">Status</th>
              <th className="p-3">Note</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{row.id || "—"}</td>
                <td className="p-3">{row.date}</td>
                <td className="p-3">{row.day}</td>
                <td className="p-3">{row.checkIn}</td>
                <td className="p-3">{row.checkOut}</td>
                <td className="p-3">{row.hours}</td>
                <td className="p-3">
                  <StatusBadge status={row.status} />
                </td>
                <td className="p-3">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
