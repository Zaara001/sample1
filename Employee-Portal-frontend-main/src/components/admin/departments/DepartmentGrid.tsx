import DepartmentCard from "./DepartmentCard";
import DeptComparison from "./DeptComparison";
import type { Department } from "../../../pages/admin/Departments";

interface Props {
  departments: Department[];
}

const DepartmentGrid = ({ departments }: Props) => {
  const getColor = (percent: number): "green" | "orange" | "red" => {
    if (percent >= 85) return "green";
    if (percent >= 70) return "orange";
    return "red";
  };

  if (departments.length === 0) {
    return <p className="p-6">No departments found</p>;
  }

  const sorted = [...departments].sort((a, b) => b.percent - a.percent);

  return (
    <div className="grid grid-cols-3 gap-3 mt-6">
      {sorted.map((dept) => (
        <DepartmentCard
          key={dept.name}
          name={dept.name}
          employees={dept.employees ?? 0}
          present={dept.present ?? 0}
          absent={dept.absent ?? 0}
          avgHours={dept.avgHours ?? "N/A"}
          late={dept.late ?? 0}
          onTime={dept.onTime ?? 0}
          percent={dept.percent}
          color={getColor(dept.percent)}
        />
      ))}

      <DeptComparison departments={departments} />
    </div>
  );
};

export default DepartmentGrid;
