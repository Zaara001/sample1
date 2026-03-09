import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface TrendData {
  day: string;
  date: string; // ✅ Added date
  attendance: number;
}

const AttendanceTrend: React.FC = () => {
  const [data, setData] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrend = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/admin/attendance-trend",
        );

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const result: TrendData[] = await res.json();

        // ✅ Remove weekends
        const filtered = result.filter(
          (item) => item.day !== "Sat" && item.day !== "Sun",
        );

        setData(filtered);
      } catch (err: unknown) {
        console.error(err);

        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unable to load attendance trend");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Attendance Trend
          </h2>
          <p className="text-sm text-gray-400">Weekly attendance overview</p>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="h-72 flex items-center justify-center text-gray-400">
          Loading chart...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="h-72 flex items-center justify-center text-red-400">
          {error}
        </div>
      )}

      {/* Chart */}
      {!loading && !error && (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />

              {/* X Axis */}
              <XAxis dataKey="day" stroke="#94a3b8" />

              {/* Y Axis */}
              <YAxis
                stroke="#94a3b8"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />

              {/* Tooltip with Date */}
              <Tooltip
                formatter={(value) => [`${value ?? 0}%`, "Attendance"]}
                labelFormatter={(label, payload) => {
                  if (payload && payload.length > 0) {
                    const rawDate = payload[0]?.payload?.date;

                    if (!rawDate) return label;

                    // Safe formatting (manual split instead of Date parsing)
                    const [year, month, day] = rawDate.split("-");

                    return `${label} (${day}/${month}/${year})`;
                  }

                  return label;
                }}
              />

              {/* Line */}
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AttendanceTrend;
