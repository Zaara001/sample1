import SummaryRow from "./SummaryRow";

const SummaryCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      <h3 className="font-semibold mb-4">📊 Feb Summary</h3>

      <div className="space-y-3 text-sm">
        <SummaryRow label="Present Days" value="13 days" color="green" />
        <SummaryRow label="Absent Days" value="1 day" color="red" />
        <SummaryRow label="Late Arrivals" value="2 days" color="yellow" />
        <SummaryRow label="Total Hours" value="112h 20m" />
        <SummaryRow label="Avg/Day" value="8h 42m" />
        <SummaryRow label="Punctuality" value="88%" />
      </div>
    </div>
  );
};

export default SummaryCard;