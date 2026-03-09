import type { AttendanceRecord } from "../../../pages/user/DailyAttendence";
import { CheckCircle, Clock, LogOut } from "lucide-react";

interface Props {
  today: AttendanceRecord | null;
}

const TodayCard = ({ today }: Props) => {
  const todayFormatted = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const isWorking = today?.checkIn && !today?.checkOut;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md font-semibold">Today — {todayFormatted}</h2>

        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold
            ${
              today?.status === "Present"
                ? "bg-green-100 text-green-600"
                : today?.status === "Late"
                  ? "bg-yellow-100 text-yellow-600"
                  : today?.status === "Absent"
                    ? "bg-red-100 text-red-500"
                    : "bg-gray-100 text-gray-500"
            }
          `}
        >
          {today?.status ?? "No Record"}
        </span>
      </div>

      {/* Timeline */}
      <div className="relative  ml-6 space-y-8">
        {/* Check In */}
        <div className="relative">
          <div className="absolute -left-6.5 bg-green-100 p-2 rounded-full">
            <CheckCircle className="text-green-600" size={16} />
          </div>
          <p className="font-medium  ml-4">Check In</p>
          <p className="text-xs text-gray-500 ml-4">{today?.checkIn ?? "—"}</p>
        </div>

        {/* Currently Working */}
        {isWorking && (
          <div className="relative">
            <div className="absolute -left-6.5 bg-blue-100 p-2 rounded-full">
              <Clock className="text-blue-600" size={16} />
            </div>
            <p className="font-medium ml-4">Currently Working</p>
            <p className="text-sm text-gray-500 ml-4">
              {today?.workingHours ?? "Calculating..."} (ongoing)
            </p>
          </div>
        )}

        {/* Check Out */}
        <div className="relative">
          <div className="absolute -left-6.5 bg-red-100 p-2 rounded-full">
            <LogOut className="text-red-500" size={16} />
          </div>
          <p className="font-medium ml-4">Check Out</p>
          <p className="text-sm text-gray-500 ml-4">
            {today?.checkOut ?? "Pending..."}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-100" />

      {/* Details */}
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Date</span>
          <span className="font-medium">{todayFormatted}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Department</span>
          <span className="font-medium">{today?.department ?? "—"}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Working Hours</span>
          <span className="font-medium">
            {today?.workingHours ?? "0h"} {isWorking && "(ongoing)"}
          </span>
        </div>
      </div>
    </>
  );
};

export default TodayCard;
