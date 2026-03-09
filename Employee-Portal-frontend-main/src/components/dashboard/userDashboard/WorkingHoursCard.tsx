import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataType {
  day: string; // e.g. Mon, Tue
  hours: number; // e.g. 8.5
}

interface WorkingHoursCardProps {
  data: DataType[];
}

const WorkingHoursCard: React.FC<WorkingHoursCardProps> = ({ data }) => {
  // ✅ Get only last 5 days
  const last5DaysData = data ? data.slice(-5) : [];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-6">
        Working Hours — Last 5 Days
      </h2>

      {/* Empty State */}
      {!data || data.length === 0 ? (
        <div className="text-center text-gray-400 py-10">No data available</div>
      ) : (
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last5DaysData}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={[0, "dataMax + 1"]}
              />

              {/* ✅ FIXED TOOLTIP */}
              <Tooltip
                formatter={(value) => {
                  if (typeof value === "number") {
                    return [`${value}h`, "Hours"];
                  }
                  return ["0h", "Hours"];
                }}
                labelStyle={{ color: "#374151" }}
                contentStyle={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />

              <Bar
                dataKey="hours"
                fill="#3b82f6"
                radius={[6, 6, 0, 0]}
                maxBarSize={60}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="text-xs text-gray-500 mt-2 text-center">
          Showing {last5DaysData.length} of {data.length} days
        </div>
      )}
    </div>
  );
};

export default WorkingHoursCard;
