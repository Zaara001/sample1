interface Props {
  data: {
    date: string;
    in: string;
    out: string;
    hours: string;
    status: "Present" | "Late" | "Absent";
  }[];
}

const RecentAttendanceTable: React.FC<Props> = ({ data }) => {
  const statusColor = (status: string) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-600";
      case "Late":
        return "bg-yellow-100 text-yellow-600";
      case "Absent":
        return "bg-red-100 text-red-600";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Attendance Log</h2>
        <button className="text-blue-600 text-sm">View All →</button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="py-2 text-left">DATE</th>
            <th className="text-left">CHECK IN</th>
            <th className="text-left">CHECK OUT</th>
            <th className="text-left">HOURS</th>
            <th className="text-left">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-3">{item.date}</td>
              <td>{item.in}</td>
              <td>{item.out}</td>
              <td>{item.hours}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentAttendanceTable;