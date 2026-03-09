const Toggle = ({ enabled = true }: { enabled?: boolean }) => (
  <div
    className={`w-12 h-6 rounded-full ${
      enabled ? "bg-blue-600" : "bg-gray-300"
    } relative`}
  >
    <div
      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${
        enabled ? "right-0.5" : "left-0.5"
      }`}
    />
  </div>
);

const AlertSettings = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h2 className="font-semibold text-lg mb-4">⚙️ Alert Settings</h2>

      <Setting
        title="Dept below threshold"
        subtitle="When attendance < 70%"
      />
      <Setting
        title="Employee absent 3+ days"
        subtitle="Consecutive absences"
      />
      <Setting
        title="New user registration"
        subtitle="Pending approvals"
      />
      <Setting
        title="Monthly report ready"
        subtitle="Auto-generated reports"
        enabled={false}
      />

      <button className="w-full mt-5 bg-blue-600 text-white py-3 rounded-xl">
        Save Settings
      </button>
    </div>
  );
};

const Setting = ({
  title,
  subtitle,
  enabled = true,
}: {
  title: string;
  subtitle: string;
  enabled?: boolean;
}) => (
  <div className="flex justify-between items-center py-4 border-b">
    <div>
      <p className="font-medium">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    <Toggle enabled={enabled} />
  </div>
);

export default AlertSettings;