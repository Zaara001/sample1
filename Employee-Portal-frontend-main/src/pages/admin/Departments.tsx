import { useEffect, useState } from "react";
import StatCard from "../../components/admin/departments/StatCard";
import DepartmentGrid from "../../components/admin/departments/DepartmentGrid";

export interface Department {
  name: string;
  employees?: number;
  present?: number;
  absent?: number;
  late?: number;
  onTime?: number;
  percent: number;
  avgHours: string;
}

const DepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/departments/page",
      );

      if (!res.ok) throw new Error("Failed to fetch departments");

      const data = await res.json();
      setDepartments(data || []);
    } catch (error) {
      console.error(error);
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const totalDepts = departments.length;

  const totalEmployees = departments.reduce(
    (sum, d) => sum + (d.employees ?? 0),
    0,
  );

  const orgAverage =
    departments.length > 0
      ? Math.round(
          departments.reduce((sum, d) => sum + d.percent, 0) /
            departments.length,
        )
      : 0;

  const bestDept =
    departments.length > 0
      ? departments.reduce((prev, curr) =>
          curr.percent > prev.percent ? curr : prev,
        )
      : null;

  const worstDept =
    departments.length > 0
      ? departments.reduce((prev, curr) =>
          curr.percent < prev.percent ? curr : prev,
        )
      : null;

  if (loading) return <p className="p-6">Loading stats...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-5 gap-6">
        <StatCard
          title="Total Depts"
          totalValue={String(totalDepts)}
          borderColor="#3B82F6"
        />

        <StatCard
          title="Best Dept"
          value={bestDept?.name}
          subtitle={bestDept ? `${bestDept.percent}%` : undefined}
          borderColor="#22C55E"
          valueColor="text-green-600"
        />

        <StatCard
          title="Needs Attention"
          value={worstDept?.name}
          subtitle={worstDept ? `${worstDept.percent}%` : undefined}
          borderColor="#EF4444"
          valueColor="text-red-600"
        />

        <StatCard
          title="Org Average"
          totalValue={`${orgAverage}%`}
          borderColor="#F59E0B"
        />

        <StatCard
          title="Total Employees"
          totalValue={String(totalEmployees)}
          borderColor="#3B82F6"
        />
      </div>

      <DepartmentGrid departments={departments} />
    </div>
  );
};

export default DepartmentsPage;
