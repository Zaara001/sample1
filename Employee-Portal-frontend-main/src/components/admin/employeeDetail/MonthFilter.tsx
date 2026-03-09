const MonthFilter = () => {
  return (
    <div className="flex justify-between items-center mt-6">
      
      <div className="flex gap-3">
        <select className="border rounded-lg px-4 py-2 bg-white">
          <option>February 2026</option>
        </select>

        <button className="border border-blue-500 text-blue-600 px-5 py-2 rounded-lg font-medium">
          Apply
        </button>
      </div>

      <div className="flex gap-3">
        <button className="border px-4 py-2 rounded-lg bg-white">
          📄 PDF
        </button>

        <button className="border px-4 py-2 rounded-lg bg-white">
          📊 Excel
        </button>
      </div>
    </div>
  );
};

export default MonthFilter;