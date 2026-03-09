const AdminActions = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm mt-4">
      <h3 className="font-semibold mb-4">⚙️ Admin Actions</h3>

      <div className="space-y-3">
        <button className="w-full border rounded-lg py-3 bg-gray-50">
          ✉️ Send Email
        </button>

        <button className="w-full border rounded-lg py-3 bg-gray-50 text-red-600">
          ⛔ Deactivate Account
        </button>
      </div>
    </div>
  );
};

export default AdminActions;