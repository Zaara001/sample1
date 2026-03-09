

interface Props {
  status: "Present" | "Late" | "Absent" | "Weekend";
}

const StatusBadge = ({ status }: Props) => {
  const colors =
    status === "Present"
      ? "bg-green-100 text-green-600"
      : status === "Late"
      ? "bg-yellow-100 text-yellow-600"
      : status === "Absent"
      ? "bg-red-100 text-red-600"
      : "bg-gray-200 text-gray-600";

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors}`}>
      {status}
    </span>
  );
};

export default StatusBadge;