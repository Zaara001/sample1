import type { AttendanceRecord } from "../../../pages/user/DailyAttendence";

interface Props {
  attendance: AttendanceRecord[];
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
}

const CalendarSection = ({
  attendance,
  currentDate,
  setCurrentDate,
}: Props) => {
  const today = new Date();

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = Array(firstDayOfMonth)
    .fill("")
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const changeMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentYear,
        direction === "prev" ? currentMonth - 1 : currentMonth + 1,
        1,
      ),
    );
  };

  const formatDate = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0",
    )}-${String(day).padStart(2, "0")}`;
  };

  const getStatusForDay = (day: number) => {
    return attendance.find((record) => record.date === formatDate(day));
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentYear}
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => changeMonth("prev")}
            className="w-10 h-10 bg-gray-100 rounded-lg"
          >
            ‹
          </button>

          <button
            onClick={() => changeMonth("next")}
            className="w-10 h-10 bg-gray-100 rounded-lg"
          >
            ›
          </button>
        </div>
      </div>

      {/* Week Labels */}
      <div className="grid grid-cols-7 text-sm text-gray-400 mb-3">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return (
              <div key={index} className="h-10 w-10 bg-gray-50 rounded-xl" />
            );
          }

          const record = getStatusForDay(day);

          const isToday =
            today.getDate() === day &&
            today.getMonth() === currentMonth &&
            today.getFullYear() === currentYear;

          let statusClass = "bg-gray-100 text-gray-500";

          if (record?.status === "Present")
            statusClass = "bg-green-100 text-green-600";

          if (record?.status === "Absent")
            statusClass = "bg-red-100 text-red-500";

          if (record?.status === "Late")
            statusClass = "bg-yellow-100 text-yellow-600";

          if (isToday) statusClass = "bg-blue-600 text-white";

          return (
            <div
              key={index}
              className={`h-16 w-16 mb-1 flex items-center justify-center rounded-xl text-sm font-medium ${statusClass}`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-green-200 rounded"></span> Present
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-200 rounded"></span> Absent
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-yellow-200 rounded"></span> Late
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-600 rounded"></span> Today
        </div>
      </div>
    </>
  );
};

export default CalendarSection;
