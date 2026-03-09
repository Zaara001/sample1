const EmployeeHeader = () => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white flex justify-between items-center">
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
          JD
        </div>

        <div>
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <p className="text-sm opacity-90">
            Software Engineer · Engineering · EMP-0042
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <StatBox label="Attendance Rate" value="94%" />
        <StatBox label="Avg Hours" value="8h 42m" />
        <StatBox label="Status" value="Present" green />
      </div>
    </div>
  );
};

const StatBox = ({
  label,
  value,
  green,
}: {
  label: string;
  value: string;
  green?: boolean;
}) => (
  <div className="bg-white/20 px-4 py-3 rounded-xl min-w-[140px]">
    <p className="text-sm opacity-90">{label}</p>
    <p
      className={`font-semibold text-lg ${
        green ? "text-green-200 flex items-center gap-2" : ""
      }`}
    >
      {green && <span className="w-3 h-3 bg-green-400 rounded-full"></span>}
      {value}
    </p>
  </div>
);

export default EmployeeHeader;