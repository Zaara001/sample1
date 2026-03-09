const ActiveSessions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Active Sessions</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center border rounded-lg p-3">
          <div>
            <p className="font-medium">Chrome - Windows</p>
            <p className="text-sm text-gray-500">Last active: 5 mins ago</p>
          </div>
          <button className="text-red-500 text-sm">Logout</button>
        </div>

        <div className="flex justify-between items-center border rounded-lg p-3">
          <div>
            <p className="font-medium">Mobile App - Android</p>
            <p className="text-sm text-gray-500">Last active: 2 hours ago</p>
          </div>
          <button className="text-red-500 text-sm">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default ActiveSessions;