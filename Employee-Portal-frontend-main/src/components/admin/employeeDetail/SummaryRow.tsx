interface SummaryRowProps {
  label: string;
  value: string;
  color?: "green" | "red" | "yellow";
}

const SummaryRow = ({ label, value, color }: SummaryRowProps) => {
  const colorClasses = {
    green: "text-green-600",
    red: "text-red-600",
    yellow: "text-yellow-600",
  };

  return (
    <div className="flex justify-between border-b pb-2">
      <span className="text-gray-500">{label}</span>
      <span className={`font-medium ${color ? colorClasses[color] : ""}`}>
        {value}
      </span>
    </div>
  );
};

export default SummaryRow;