interface Props {
  status: "Active" | "Inactive" | "Pending";
}

const StatusBadge = ({ status }: Props) => {
  const styles = {
    Active: "bg-green-100 text-green-600",
    Inactive: "bg-gray-100 text-gray-500",
    Pending: "bg-yellow-100 text-yellow-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;