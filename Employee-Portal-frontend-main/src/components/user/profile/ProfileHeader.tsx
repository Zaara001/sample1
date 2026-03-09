const ProfileHeader = () => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-semibold">My Profile</h1>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        ✏️ Edit Profile
      </button>
    </div>
  );
};

export default ProfileHeader;