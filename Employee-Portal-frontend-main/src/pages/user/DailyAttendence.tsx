import { useEffect, useState } from "react";
import CalendarSection from "../../components/dashboard/userDashboard/CalendarSection";
import TodayCard from "../../components/dashboard/userDashboard/TodayCard";

export interface AttendanceRecord {
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Present" | "Late" | "Absent";
  department: string;
  workingHours: string;
}

function DailyAttendance() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

  const fetchAttendance = async (year: number, month: number) => {
    try {
      const token = localStorage.getItem("token");
      const formattedMonth = String(month + 1).padStart(2, "0");

      const response = await fetch(
        `http://localhost:5000/api/employee/attendance/monthly/${year}/${formattedMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }

      const result = await response.json();
      setAttendance(result.records || []);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setAttendance([]);
    } finally {
      setLoading(false);
    }
  };

  // Runs whenever month changes
  useEffect(() => {
    setLoading(true);
    fetchAttendance(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const todayDate = new Date().toISOString().split("T")[0];
  const todayRecord =
    attendance.find((record) => record.date === todayDate) || null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 m-4">
      <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="text-center py-10">Loading attendance...</div>
        ) : (
          <CalendarSection
            attendance={attendance}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
        )}
      </div>

      <div className="bg-white lg:col-span-2 rounded-2xl p-6 shadow-sm">
        {loading ? (
          <div className="text-center py-10">Loading...</div>
        ) : (
          <TodayCard today={todayRecord} />
        )}
      </div>
    </div>
  );
}

export default DailyAttendance;
