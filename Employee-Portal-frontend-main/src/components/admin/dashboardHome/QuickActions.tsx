

const QuickActions = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

      <div className="space-y-3">
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Export Today's Report
        </button>

        <button className="w-full border py-2 rounded-lg">
          Email Absent Employees
        </button>

        <button className="w-full border py-2 rounded-lg">
          View Department Report
        </button>
      </div>
    </div>
  );
};

export default QuickActions;