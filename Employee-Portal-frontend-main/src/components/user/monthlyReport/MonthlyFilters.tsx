

const MonthlyFilters = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <select className="px-4 py-2 border rounded-lg bg-white">
        <option>February 2026</option>
      </select>

      <select className="px-4 py-2 border rounded-lg bg-white">
        <option>January 2026</option>
      </select>

      <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
        Apply
      </button>

      <div className="ml-auto text-gray-500">
        Showing: Feb 1 – Feb 17, 2026
      </div>
    </div>
  );
};

export default MonthlyFilters;