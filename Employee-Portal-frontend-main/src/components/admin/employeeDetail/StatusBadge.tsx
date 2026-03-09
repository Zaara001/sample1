interface Props {
  status: "Present" | "Late" | "Absent" | "Ongoing";
}

const StatusBadge = ({ status }: Props) => {
  const styles = {
    Present: "bg-green-100 text-green-600",
    Late: "bg-yellow-100 text-yellow-600",
    Absent: "bg-red-100 text-red-600",
    Ongoing: "bg-blue-100 text-blue-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;