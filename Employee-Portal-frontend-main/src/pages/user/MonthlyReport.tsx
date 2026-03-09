import MonthlySummaryCards from "../../components/user/monthlyReport/MonthlySummaryCards";
import MonthlyFilters from "../../components/user/monthlyReport/MonthlyFilters";
import AttendanceTable from "../../components/user/monthlyReport/AttendanceTable";

const MonthlyReport = () => {
  return (
    <div className="p-10">
      <MonthlyFilters />
      <MonthlySummaryCards />
      <AttendanceTable />
    </div>
  );
};

export default MonthlyReport;
