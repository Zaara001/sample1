const QuickExportCard = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-3">
      <h3 className="font-semibold">📤 Quick Export</h3>

      <button className="w-full bg-gray-200 py-2 rounded-lg">
        📄 Download This Month (PDF)
      </button>

      <button className="w-full bg-gray-200 py-2 rounded-lg">
        📊 Download This Month (Excel)
      </button>
    </div>
  );
};

export default QuickExportCard;