import type { Employee } from "../../../types/employee";

interface Props {
  users: Employee[];
}

const UserStats = ({ users }: Props) => {
  const total = users.length;
  const active = users.filter((u) => u.account === "Active").length;
  const inactive = users.filter((u) => u.account === "Inactive").length;
  const pending = users.filter((u) => u.account === "Pending").length;

  return (
    <div className="grid grid-cols-4 gap-6">
      <Stat title="Total Users" value={total} color="blue" />
      <Stat title="Active" value={active} color="green" />
      <Stat title="Inactive" value={inactive} color="red" />
      <Stat title="Pending Verification" value={pending} color="orange" />
    </div>
  );
};

const Stat = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string | number;
  color: string;
}) => {
  const colors: Record<string, string> = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    orange: "border-orange-500",
  };

  return (
    <div className={`bg-white p-6 rounded-2xl border-t-4 ${colors[color]}`}>
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default UserStats;
