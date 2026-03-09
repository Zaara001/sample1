const SecurityCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="font-semibold">🔒 Security</h3>

      <div className="text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Last Login</span>
          <span>Today 09:02 AM</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Login Method</span>
          <span>LDAP</span>
        </div>
      </div>

      <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg text-sm">
        ⚠ LDAP users must reset password through IT Admin
      </div>

      <button className="w-full bg-gray-200 py-2 rounded-lg">
        🔑 Request Password Reset
      </button>
    </div>
  );
};

export default SecurityCard;