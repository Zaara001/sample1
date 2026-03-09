import QuickExportCard from "../../components/admin/exportReports/QuickExportCard";
import CustomReportBuilder from "../../components/admin/exportReports/CustomReportBuilder";
import RecentExportsTable from "../../components/admin/exportReports/RecentExportsTable";

const ExportReportsPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="grid grid-cols-2 gap-6">

        {/* Left Side */}
        <div className="space-y-6">
          <h2 className="font-semibold text-xl">⚡ Quick Export</h2>

          <QuickExportCard
            title="All Employees — This Month"
            subtitle="February 2026 · 124 employees"
            buttons={["Excel", "PDF", "CSV"]}
          />

          <QuickExportCard
            title="Department-wise Report"
            subtitle="February 2026 · All Departments"
            buttons={["Excel", "PDF"]}
          />

          <QuickExportCard
            title="Today's Attendance"
            subtitle="Feb 17, 2026 · Real-time"
            buttons={["Excel", "PDF"]}
          />
        </div>

        {/* Right Side */}
        <CustomReportBuilder />
      </div>

      <RecentExportsTable />

    </div>
  );
};

export default ExportReportsPage;