const DailyLoginTime = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">
        ⏰ Daily Login Time (Feb)
      </h2>

      <div className="flex gap-3">
        {[2,3,4,6,9,10,11,17].map((day, index) => (
          <div key={index} className="text-center">
            <div className="w-14 h-10 bg-green-200 rounded-lg"></div>
            <p className="text-xs text-gray-500 mt-1">{day}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-6 mt-6 text-sm text-gray-500">
        <p>🟢 On-time (&lt;09:05)</p>
        <p>🟡 Late (&gt;09:05)</p>
      </div>
    </div>
  );
};

export default DailyLoginTime;