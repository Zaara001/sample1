const ThresholdConfig = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-4">⚙️ Threshold Config</h2>

      <Field label="Min Attendance Rate (%)" value="70" />
      <Field label="Late Arrival Limit (per month)" value="5" />
      <Field label="Consecutive Absence Alert" value="3 days" />

      <button className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl">
        Update Thresholds
      </button>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-4">
    <label className="text-sm font-medium">{label}</label>
    <input
      value={value}
      readOnly
      className="w-full mt-2 border rounded-xl p-3 bg-gray-50"
    />
  </div>
);

export default ThresholdConfig;