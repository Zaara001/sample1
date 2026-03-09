import EmployeeHeader from "../../components/admin/employeeDetail/EmployeeHeader.tsx";
import MonthFilter from "../../components/admin/employeeDetail/MonthFilter.tsx";
import AttendanceTable from "../../components/admin/employeeDetail/AttendanceTable.tsx";
import SummaryCard from "../../components/admin/employeeDetail/SummaryCard.tsx";
import AdminActions from "../../components/admin/employeeDetail/AdminActions.tsx";

interface AttendanceRecord {
  date: string;
  day: string;
  checkIn?: string;
  checkOut?: string;
  hours?: string;
  status: "Present" | "Late" | "Absent" | "Ongoing";
}

const attendanceData: AttendanceRecord[] = [
  {
    date: "Feb 2",
    day: "Mon",
    checkIn: "08:58",
    checkOut: "18:01",
    hours: "9h 03m",
    status: "Present",
  },
  {
    date: "Feb 3",
    day: "Tue",
    checkIn: "09:00",
    checkOut: "18:00",
    hours: "9h 00m",
    status: "Present",
  },
  {
    date: "Feb 6",
    day: "Fri",
    checkIn: "09:10",
    checkOut: "18:10",
    hours: "9h 00m",
    status: "Late",
  },
  {
    date: "Feb 10",
    day: "Tue",
    checkIn: "09:20",
    checkOut: "18:15",
    hours: "8h 55m",
    status: "Late",
  },
  {
    date: "Feb 16",
    day: "Mon",
    status: "Absent",
  },
  {
    date: "Feb 17",
    day: "Tue",
    checkIn: "09:02",
    hours: "Ongoing",
    status: "Ongoing",
  },
];

const EmployeeDetailPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <EmployeeHeader />

      <MonthFilter />

      <div className="grid grid-cols-3 gap-6 mt-6">
        <div className="col-span-2">
          <AttendanceTable data={attendanceData} />
        </div>

        <div>
          <SummaryCard />
          <AdminActions />
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailPage;
