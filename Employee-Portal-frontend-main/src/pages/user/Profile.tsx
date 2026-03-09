import ProfileHeader from "../../components/user/profile/ProfileHeader";
import ProfileCard from "../../components/user/profile/ProfileCard";
import QuickStatsCard from "../../components/user/profile/QuickStatsCard";
import SecurityCard from "../../components/user/profile/SecurityCard";
import QuickExportCard from "../../components/user/profile/QuickExportCard";

const Profile = () => {
  return (
    <div className="flex gap-6 p-6">
      {/* LEFT SIDE */}
      <div className="flex-1 space-y-6">
        <ProfileHeader />
        <ProfileCard />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-87.5 space-y-6">
        <QuickStatsCard />
        <SecurityCard />
        <QuickExportCard />
      </div>
    </div>
  );
};

export default Profile;