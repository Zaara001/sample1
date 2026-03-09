import AlertStats from "../../components/admin/alerts/AlertStats";
import AlertsList from "../../components/admin/alerts/AlertsList";
import AlertSettings from "../../components/admin/alerts/AlertSettings";
import ThresholdConfig from "../../components/admin/alerts/ThresholdConfig";

const AlertsPage = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <AlertStats />

      <div className="grid grid-cols-3 gap-6 mt-6">

        <div className="col-span-2">
          <AlertsList />
        </div>

        <div className="space-y-6">
          <AlertSettings />
          <ThresholdConfig />
        </div>

      </div>

    </div>
  );
};

export default AlertsPage;