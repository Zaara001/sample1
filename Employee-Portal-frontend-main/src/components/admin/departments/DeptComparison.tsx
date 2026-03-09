import type { Department } from "../../../pages/admin/Departments";

interface Props {
  departments: Department[];
}

const DeptComparison = ({ departments }: Props) => {
  if (departments.length === 0) return null;

  const getColor = (percent: number) => {
    if (percent >= 85) return "bg-green-500";
    if (percent >= 70) return "bg-orange-500";
    return "bg-red-500";
  };

  const orgAverage = Math.round(
    departments.reduce((sum, d) => sum + d.percent, 0) / departments.length,
  );

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">📊 Dept Comparison</h3>

      <div className="space-y-4">
        {departments.map((d) => (
          <div key={d.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{d.name}</span>
              <span>{d.percent}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className={`${getColor(d.percent)} h-2 rounded-full`}
                style={{ width: `${d.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="border-t mt-5 pt-3 flex justify-between font-medium">
        <span>Org Average</span>
        <span className="text-blue-600">{orgAverage}%</span>
      </div>
    </div>
  );
};

export default DeptComparison;
