import AlertItem from "./AlertItem";

const AlertsList = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex justify-between p-6 border-b">
        <h2 className="font-semibold text-lg">🔔 Recent Alerts</h2>

        <div className="flex gap-2">
          <button className="bg-gray-100 px-4 py-1 rounded-lg">All</button>
          <button className="text-gray-500 px-4 py-1">Unread</button>
        </div>
      </div>

      <AlertItem
        title="Department Below 70% Threshold"
        description="Marketing Department attendance has fallen to 68% — below threshold."
        date="Feb 17, 2026 · 10:30 AM"
        type="Critical"
      />

      <AlertItem
        title="High Late Arrivals in Finance"
        description="Finance department recorded 11 late arrivals this month."
        date="Feb 16, 2026 · 06:00 PM"
        type="Warning"
      />

      <AlertItem
        title="3 New Users Pending Verification"
        description="New employees registered and awaiting admin approval."
        date="Feb 15, 2026 · 02:45 PM"
        type="Info"
      />
    </div>
  );
};

export default AlertsList;