import PersonalInfoSection from "./PersonalInfoSection";
import BiometricSection from "./BiometricSection";

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      {/* TOP BLUE SECTION */}
      <div className="bg-linear-to-r from-blue-500 to-blue-600 p-6 text-white">
        <p className="text-sm">Employee Profile</p>
        <h2 className="text-2xl font-bold">John Doe</h2>
        <p>Software Engineer · Engineering Department</p>
      </div>

      {/* INFO SECTION */}
      <div className="p-6 space-y-8">
        <PersonalInfoSection />
        <BiometricSection />
      </div>
    </div>
  );
};

export default ProfileCard;
