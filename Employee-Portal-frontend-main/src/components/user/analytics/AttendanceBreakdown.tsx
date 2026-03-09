const AttendanceBreakdown = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">👋 Attendance Breakdown</h2>

      <div className="flex items-center justify-between">
        <div className="w-40 h-40 rounded-full border-20 border-green-500 relative">
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
            94%
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p>
            <span className="text-green-500">●</span> Present 118 days
          </p>
          <p>
            <span className="text-red-500">●</span> Absent 5 days
          </p>
          <p>
            <span className="text-yellow-500">●</span> Late 8 days
          </p>
        </div>
      </div>
    </div>
  );
};

export default AttendanceBreakdown;
