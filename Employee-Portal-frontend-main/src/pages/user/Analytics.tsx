import AnalyticsHeader from "../../components/user/analytics/AnalyticsHeader";
import AnalyticsStats from "../../components/user/analytics/AnalyticsStats";
import MonthlyWorkingHours from "../../components/user/analytics/MonthlyWorkingHours";
import AttendanceBreakdown from "../../components/user/analytics/AttendanceBreakdown";
import DailyLoginTime from "../../components/user/analytics/DailyLoginTime";
import StreakMilestones from "../../components/user/analytics/StreakMilestones";

const Analytics = () => {
  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-6">
      <AnalyticsHeader />
      <AnalyticsStats />

      <div className="grid grid-cols-2 gap-6 mb-6">
        <MonthlyWorkingHours />
        <AttendanceBreakdown />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <DailyLoginTime />
        <StreakMilestones />
      </div>
    </div>
  );
};

export default Analytics;