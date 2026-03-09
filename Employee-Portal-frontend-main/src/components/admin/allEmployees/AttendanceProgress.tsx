interface Props {
  percentage: number;
}

const AttendanceProgress = ({ percentage }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-24 h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-green-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm">{percentage}%</span>
    </div>
  );
};

export default AttendanceProgress;