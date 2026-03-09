const AnalyticsHeader = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">My Analytics</h1>

      <select className="border rounded-lg px-4 py-2 bg-white">
        <option>Last 6 Months</option>
      </select>
    </div>
  );
};

export default AnalyticsHeader;