import React from "react";

interface WelcomeCardProps {
  name: string;
  checkIn: string;
  checkOut: string;
  hoursToday: string;
  status: "In Office" | "Remote" | "Absent" | "Weekend";
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({
  name,
  checkIn,
  checkOut,
  hoursToday,
  status,
}) => {
  return (
    <div className="bg-linear-to-r from-blue-700 to-blue-500 rounded-2xl p-6 text-white relative overflow-hidden">
      {/* Greeting */}
      <div>
        <p className="text-sm opacity-90">Good Morning 👋</p>
        <h2 className="text-2xl font-semibold mt-1">{name}</h2>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap gap-4 mt-2">
        {/* Check In */}
        <div className="bg-white/25 backdrop-blur-xl px-5 py-2 rounded-md border border-white/20">
          <p className="text-xs opacity-80">Check In</p>
          <p className="text-sm font-semibold mt-1">{checkIn}</p>
        </div>

        {/* Check Out */}
        <div className="bg-white/25 backdrop-blur-xl px-5 py-2 rounded-md border border-white/20">
          <p className="text-xs opacity-80">Check Out</p>
          <p className="text-sm font-semibold mt-1">{checkOut}</p>
        </div>

        {/* Hours Today */}
        <div className="bg-white/25 backdrop-blur-xl px-5 py-2 rounded-md border border-white/20">
          <p className="text-xs opacity-80">Hours Today</p>
          <p className="text-sm font-semibold mt-1">{hoursToday}</p>
        </div>

        {/* Status */}
        <div className="bg-white/25 backdrop-blur-xl px-5 py-2 rounded-md border border-white/20 flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full"></span>
          <div>
            <p className="text-xs opacity-80">Status</p>
            <p className="text-sm font-semibold">{status}</p>
          </div>
        </div>
      </div>

      {/* Right Decorative Icon */}
      <div className="absolute right-10 top-10 text-8xl opacity-10">🖐</div>
    </div>
  );
};

export default WelcomeCard;
