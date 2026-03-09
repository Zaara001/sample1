const AlertStats = () => {
  return (
    <div className="grid grid-cols-4 gap-6">
      <Card title="Critical" value="2" color="red" />
      <Card title="Warnings" value="5" color="yellow" />
      <Card title="Info" value="8" color="blue" />
      <Card title="Resolved" value="24" color="green" />
    </div>
  );
};

const Card = ({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: "red" | "yellow" | "blue" | "green";
}) => {
  const border = {
    red: "border-red-500",
    yellow: "border-yellow-500",
    blue: "border-blue-500",
    green: "border-green-500",
  };

  return (
    <div className={`bg-white p-6 rounded-2xl border-t-4 ${border[color]}`}>
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
};

export default AlertStats;