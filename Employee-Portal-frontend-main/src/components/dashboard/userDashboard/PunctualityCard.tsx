interface Props {
  data: {
    score: number;
    onTimeDays: number;
    lateDays: number;
  };
}

const PunctualityCard: React.FC<Props> = ({ data }) => {
  const total = data.onTimeDays + data.lateDays || 1;
  const onTimePercentage = (data.onTimeDays / total) * 100;
  const latePercentage = (data.lateDays / total) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Punctuality Score</h2>

      <div className="text-4xl font-bold text-green-500 mb-2">
        {data.score}%
      </div>

      <p className="text-sm text-gray-500 mb-6">
        On-time arrivals this month
      </p>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>On-time</span>
          <span>{data.onTimeDays} days</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${onTimePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span>Late</span>
          <span>{data.lateDays} days</span>
        </div>
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div
            className="bg-yellow-500 h-2 rounded-full"
            style={{ width: `${latePercentage}%` }}
          ></div>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
        Download Report
      </button>
    </div>
  );
};

export default PunctualityCard;