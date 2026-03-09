import Badge from "./Badge";

interface Props {
  title: string;
  description: string;
  date: string;
  type: "Critical" | "Warning" | "Info";
}

const AlertItem = ({ title, description, date, type }: Props) => {
  const variantMap = {
    Critical: "red",
    Warning: "yellow",
    Info: "blue",
  } as const;

  return (
    <div className="border-l-4 border-red-500 pl-4 py-5 border-b">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>

          <div className="flex gap-2 mt-1">
            <Badge label={type} variant={variantMap[type]} />
            <Badge label="Unread" variant="yellow" />
          </div>

          <p className="text-gray-600 mt-2">{description}</p>

          <p className="text-sm text-gray-500 mt-2">📅 {date}</p>

          <div className="flex gap-3 mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl">
              View →
            </button>
            <button className="border px-4 py-2 rounded-xl">
              Resolve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertItem;