interface Props {
  label: string;
  variant?: "red" | "yellow" | "blue" | "green" | "gray";
}

const Badge = ({ label, variant = "gray" }: Props) => {
  const styles = {
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-100 text-yellow-600",
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    gray: "bg-gray-100 text-gray-500",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[variant]}`}>
      {label}
    </span>
  );
};

export default Badge;