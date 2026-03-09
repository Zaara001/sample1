const CustomReportBuilder = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <h2 className="font-semibold text-lg mb-5">⚙️ Custom Report Builder</h2>

      {/* Department */}
      <div className="mb-4">
        <label className="text-sm font-medium">Select Department</label>
        <select className="w-full mt-2 border rounded-xl p-3 bg-gray-50">
          <option>All Departments</option>
        </select>
      </div>

      {/* Date Range */}
      <div className="mb-4">
        <label className="text-sm font-medium">Date Range</label>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <input
            type="text"
            value="01 Feb 2026"
            readOnly
            className="border rounded-xl p-3 bg-gray-50"
          />
          <input
            type="text"
            value="17 Feb 2026"
            readOnly
            className="border rounded-xl p-3 bg-gray-50"
          />
        </div>
      </div>

      {/* Format */}
      <div className="mb-4">
        <label className="text-sm font-medium">Export Format</label>
        <div className="flex gap-4 mt-3">
          <button className="border-2 border-blue-600 px-4 py-2 rounded-lg bg-blue-50">
            Excel
          </button>
          <button className="border px-4 py-2 rounded-lg bg-gray-50">
            PDF
          </button>
          <button className="border px-4 py-2 rounded-lg bg-gray-50">
            CSV
          </button>
        </div>
      </div>

      {/* Include */}
      <div className="mb-6">
        <label className="text-sm font-medium">Include</label>
        <div className="mt-3 space-y-2 text-sm">
          <div>
            <input type="checkbox" defaultChecked className="mr-2" />
            Login / Logout Times
          </div>
          <div>
            <input type="checkbox" defaultChecked className="mr-2" />
            Working Hours
          </div>
          <div>
            <input type="checkbox" defaultChecked className="mr-2" />
            Monthly Summary
          </div>
          <div>
            <input type="checkbox" className="mr-2" />
            Analytics Charts
          </div>
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
        Generate Report →
      </button>
    </div>
  );
};

export default CustomReportBuilder;