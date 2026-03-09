import React, { useEffect, useState } from "react";

interface Department {
  name: string;
  percent: number;
}

interface DepartmentResponse {
  dayStatus: "NO_DATA" | "IN_PROGRESS";
  data: Department[];
}

const DepartmentAttendance: React.FC = () => {
  const [response, setResponse] = useState<DepartmentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/departments");
        const json = await res.json();

        setResponse(json);
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Dept Attendance</h2>

      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : response?.dayStatus === "NO_DATA" ? (
        // ✅ NO DATA UI
        <div className="text-center py-10 text-gray-500">
          No department attendance available for today.
        </div>
      ) : (
        <div className="space-y-4">
          {response?.data.map((dept, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1">
                <span>{dept.name}</span>
                <span>{dept.percent}%</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${dept.percent}%` }}
                />
              </div>
            </div>
          ))}

          {response?.data.length === 0 && (
            <div className="text-gray-400 text-sm">
              No department data available
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DepartmentAttendance;
