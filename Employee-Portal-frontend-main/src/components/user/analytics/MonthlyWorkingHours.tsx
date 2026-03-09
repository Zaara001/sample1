const MonthlyWorkingHours = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">
        📊 Monthly Working Hours Trend
      </h2>

      <div className="flex justify-between mt-16">
        {["Sep", "Oct", "Nov", "Dec", "Jan", "Feb"].map((month) => (
          <div key={month} className="text-center">
            <div className="w-16 h-2 bg-green-400 rounded-full mb-2"></div>
            <p className="text-sm text-gray-500">{month}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6 text-sm text-gray-400">
        <span>160h</span>
        <span>avg target</span>
        <span>200h</span>
      </div>
    </div>
  );
};

export default MonthlyWorkingHours;