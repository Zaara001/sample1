interface Props {
  title: string;
  subtitle: string;
  buttons: string[];
}

const QuickExportCard = ({ title, subtitle, buttons }: Props) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>

        <div className="flex gap-3">
          {buttons.map((btn) => (
            <button
              key={btn}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                btn === "Excel"
                  ? "bg-blue-600 text-white"
                  : "border bg-gray-50"
              }`}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickExportCard;