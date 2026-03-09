import NotificationPreferences from "../../components/user/settings/NotificationPreferences";
import Preferences from "../../components/user/settings/Preferences";
import ActiveSessions from "../../components/user/settings/ActiveSessions";

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Side */}
        <div className="space-y-6">
          <NotificationPreferences />
          <ActiveSessions />
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          <Preferences />
        </div>

      </div>
    </div>
  );
};

export default Settings;