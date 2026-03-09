import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  percentage: number;
}

interface Props {
  data: AttendanceSummary;
}

const COLORS = ["#22c55e", "#ef4444", "#facc15"];

const AttendancePieCard: React.FC<Props> = ({ data }) => {
  const chartData = [
    { name: "Present", value: data.present },
    { name: "Absent", value: data.absent },
    { name: "Late", value: data.late },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">Monthly Attendance</h2>

      <div className="flex flex-col items-center">
        <div className="w-40 h-40">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={3}
              >
                {chartData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* ✅ Use backend percentage directly */}
        <div className="text-xl font-bold mt-4">{data.percentage}%</div>

        <div className="mt-6 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            Present {data.present}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            Absent {data.absent}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            Late {data.late}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePieCard;
