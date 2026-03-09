import StatCard from "../../dashboard/userDashboard/StatCard";
import { Target, Clock, Calendar, Moon } from "lucide-react";

const AnalyticsStats = () => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <StatCard
        title="Punctuality Score"
        value="88%"
        subtitle="↑ 3% vs last"
        color="green"
        icon={Target}
      />

      <StatCard
        title="Avg Daily Hours"
        value="8.7h"
        subtitle="↑ 0.4h"
        color="green"
        icon={Clock}
      />

      <StatCard
        title="Attendance Rate"
        value="94%"
        subtitle="↑ 2%"
        color="yellow"
        icon={Calendar}
      />

      <StatCard
        title="Early Departures"
        value="3"
        subtitle="↑ 1 vs last"
        color="red"
        icon={Moon}
      />
    </div>
  );
};

export default AnalyticsStats;
