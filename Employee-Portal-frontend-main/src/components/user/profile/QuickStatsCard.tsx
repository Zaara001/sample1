const QuickStatsCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="font-semibold mb-4">📊 Quick Stats</h3>

      <div className="space-y-3 text-sm">
        <StatRow label="Attendance Rate" value="94%" />
        <StatRow label="Avg Hours/Day" value="8h 42m" />
        <StatRow label="Punctuality" value="88%" />
        <StatRow label="Total Working Days" value="118 days" />
      </div>
    </div>
  );
};

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b pb-2">
    <span className="text-gray-500">{label}</span>
    <span>{value}</span>
  </div>
);

export default QuickStatsCard;