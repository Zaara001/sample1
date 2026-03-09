const NotificationPreferences = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Notification Preferences</h2>

      <div className="space-y-4">
        {[
          "Email Notifications",
          "Push Notifications",
          "SMS Notifications",
        ].map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{item}</span>
            <input type="checkbox" className="toggle" defaultChecked />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreferences;