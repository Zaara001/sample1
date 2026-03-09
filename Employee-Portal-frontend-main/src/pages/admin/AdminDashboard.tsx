import { useEffect, useState } from "react";
import { Users, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

import StatCard from "../../components/admin/dashboardHome/StatCard";
import LiveAttendanceTable from "../../components/admin/dashboardHome/LiveAttendanceTable";
import DepartmentAttendance from "../../components/admin/dashboardHome/DepartmentAttendance";
import QuickActions from "../../components/admin/dashboardHome/QuickActions";
import AttendanceTrend from "../../components/admin/dashboardHome/AttendanceTrend";

import { adminApi } from "../../services/adminApi";

interface DashboardData {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  totalDepartments: number;
  dayStatus: "NO_DATA" | "IN_PROGRESS";
}

const AdminDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await adminApi.getDashboard();
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  const lateToday = data.lateToday;

  return (
    <div className="p-2 space-y-6 bg-gray-100 min-h-screen">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={data.totalEmployees}
          subtitle="Company wide"
          color="blue"
          icon={Users}
        />
        <StatCard
          title="Present Today"
          value={data.presentToday}
          subtitle={
            data.dayStatus === "NO_DATA"
              ? "No attendance recorded yet"
              : "Live status"
          }
          color="green"
          icon={CheckCircle}
        />

        <StatCard
          title="Absent Today"
          value={data.absentToday}
          subtitle={
            data.dayStatus === "NO_DATA"
              ? "No attendance recorded yet"
              : "Live status"
          }
          color="red"
          icon={XCircle}
        />

        <StatCard
          title="Late Arrivals"
          value={lateToday}
          subtitle={
            data.dayStatus === "NO_DATA"
              ? "No attendance recorded yet"
              : "Live Status"
          }
          color="yellow"
          icon={AlertTriangle}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <LiveAttendanceTable />
          <AttendanceTrend />
        </div>

        <div className="space-y-6">
          <DepartmentAttendance />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
