interface Props {
  name: string;
  employees?: number;
  present?: number;
  absent?: number;
  avgHours?: string;
  late?: number;
  onTime?: number;
  percent: number;
  color: "green" | "orange" | "red";
}

const DepartmentCard = ({
  name,
  employees = 0,
  present = 0,
  absent = 0,
  avgHours = "N/A",
  late = 0,
  onTime = 0,
  percent,
  color,
}: Props) => {
  const progressColor = {
    green: "bg-green-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };

  const badgeColor = {
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    red: "bg-red-100 text-red-600",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{employees} employees</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${badgeColor[color]}`}
        >
          {percent}%
        </span>
      </div>

      {/* Progress */}
      <div className="w-full bg-gray-200 h-2 rounded-full mt-4">
        <div
          className={`h-2 rounded-full ${progressColor[color]}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      {/* Present / Absent */}
      <div className="grid grid-cols-2 gap-4 mt-5">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <h3 className="text-2xl font-bold text-green-600">{present}</h3>
          <p className="text-sm text-green-600">Present</p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 text-center">
          <h3 className="text-2xl font-bold text-red-600">{absent}</h3>
          <p className="text-sm text-red-600">Absent</p>
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 text-sm space-y-2 border-t pt-4">
        <div className="flex justify-between">
          <span className="text-gray-500">Avg Hours</span>
          <span>{avgHours}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Late Arrivals</span>
          <span className="text-orange-600">{late}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">On-time Rate</span>
          <span className="text-green-600">{onTime}%</span>
        </div>
      </div>

      {/* Button */}
      <button className="w-full mt-5 border rounded-xl py-3 text-sm font-medium bg-gray-50">
        View Details →
      </button>
    </div>
  );
};

export default DepartmentCard;
