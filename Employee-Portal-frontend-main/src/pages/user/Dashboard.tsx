import { useEffect, useState } from "react";
import StatCard from "../../components/dashboard/userDashboard/StatCard";
import WelcomeCard from "../../components/dashboard/userDashboard/WelcomeCard";
import WorkingHoursCard from "../../components/dashboard/userDashboard/WorkingHoursCard";
import AttendancePieCard from "../../components/dashboard/userDashboard/AttendancePieCard";
import RecentAttendanceTable from "../../components/dashboard/userDashboard/RecentAttendanceTable";
import PunctualityCard from "../../components/dashboard/userDashboard/PunctualityCard";
import { CalendarCheck, Clock, AlertTriangle, UserX } from "lucide-react";

/* ================= TYPES ================= */

// Backend working hours item
interface BackendWorkingHours {
  day: string;
  hours: number; // ✅ Changed from totalMinutes to hours (as per your controller)
}

// Backend API response - Updated to match actual response
interface BackendDashboardResponse {
  name?: string;
  checkIn?: string;
  checkOut?: string;
  hoursToday?: string;
  status?: "In Office" | "Remote" | "Absent" | "Weekend";

  // ✅ Stats is now a nested object
  stats?: {
    presentDays: number;
    lateDays: number;
    absentDays: number;
    avgHours: string;
  };

  workingHours?: BackendWorkingHours[];

  attendanceSummary?: {
    present: number;
    absent: number;
    late: number;
    percentage: number;
  };

  punctuality?: {
    score: number;
    onTimeDays: number;
    lateDays: number;
  };

  recentAttendance?: {
    date: string;
    in: string;
    out: string;
    hours: string;
    status: "Present" | "Late" | "Absent";
  }[];
}

// Frontend structure
interface DashboardData {
  name: string;
  checkIn: string;
  checkOut: string;
  hoursToday: string;
  status: "In Office" | "Remote" | "Absent" | "Weekend";

  stats: {
    presentDays: number;
    avgHours: string;
    lateArrivals: number;
    absentDays: number;
  };

  workingHours: {
    day: string;
    hours: number;
  }[];

  attendanceSummary: {
    present: number;
    absent: number;
    late: number;
    percentage: number;
  };

  punctuality: {
    score: number;
    onTimeDays: number;
    lateDays: number;
  };

  recentAttendance: {
    date: string;
    in: string;
    out: string;
    hours: string;
    status: "Present" | "Late" | "Absent";
  }[];
}

/* ================= COMPONENT ================= */

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No authentication token found");
        }

        const response = await fetch(
          "http://localhost:5000/api/employee/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: BackendDashboardResponse = await response.json();

        console.log("API RESULT:", result);

        // ✅ Working hours mapping - no conversion needed if backend sends hours directly
        const formattedWorkingHours =
          result.workingHours?.map((item: BackendWorkingHours) => ({
            day: item.day,
            hours: item.hours, // ✅ Direct mapping if backend already sends hours
          })) || [];

        // ✅ FIXED: Transform backend → frontend with proper nested object access
        setData({
          name: result.name || "User",
          checkIn: result.checkIn || "--",
          checkOut: result.checkOut || "--",
          hoursToday: result.hoursToday || "0h 0m",
          status: result.status || "Absent",

          // 🔥 FIXED STATS MAPPING - Access nested stats object
          stats: {
            presentDays: result.stats?.presentDays ?? 0, // ✅ Access nested stats
            avgHours: result.stats?.avgHours ?? "0h 0m", // ✅ Correct property name
            lateArrivals: result.stats?.lateDays ?? 0, // ✅ Map lateDays → lateArrivals
            absentDays: result.stats?.absentDays ?? 0, // ✅ Access nested stats
          },

          workingHours: formattedWorkingHours,

          attendanceSummary: result.attendanceSummary ?? {
            present: 0,
            absent: 0,
            late: 0,
            percentage: 0,
          },

          punctuality: result.punctuality ?? {
            score: 0,
            onTimeDays: 0,
            lateDays: 0,
          },

          recentAttendance: result.recentAttendance ?? [],
        });
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Error loading dashboard
              </h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No data state
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">No data available</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Welcome */}
      <div className="mb-6">
        <WelcomeCard
          name={data.name}
          checkIn={data.checkIn}
          checkOut={data.checkOut}
          hoursToday={data.hoursToday}
          status={data.status}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Present Days"
          value={data.stats.presentDays.toString()}
          subtitle={`Total working days attended`}
          color="green"
          icon={CalendarCheck}
        />

        <StatCard
          title="Avg Working Hours"
          value={data.stats.avgHours}
          subtitle={`Daily average`}
          color="blue"
          icon={Clock}
        />

        <StatCard
          title="Late Arrivals"
          value={data.stats.lateArrivals.toString()}
          subtitle={`Times arrived late`}
          color="yellow"
          icon={AlertTriangle}
        />

        <StatCard
          title="Absent Days"
          value={data.stats.absentDays.toString()}
          subtitle={`Days not present`}
          color="red"
          icon={UserX}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <WorkingHoursCard data={data.workingHours} />
        </div>

        <AttendancePieCard data={data.attendanceSummary} />
      </div>

      {/* Table + Punctuality Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <RecentAttendanceTable data={data.recentAttendance} />
        </div>

        <PunctualityCard data={data.punctuality} />
      </div>
    </div>
  );
}

export default Dashboard;
