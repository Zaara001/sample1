interface Props {
  title: string;
  value?: string;
  totalValue?: string;
  subtitle?: string;
  borderColor: string;
  valueColor?: string;
}

const StatCard = ({
  title,
  value,
  totalValue,
  subtitle,
  borderColor,
  valueColor,
}: Props) => {
  return (
    <div
      className="bg-white  rounded-2xl p-4 shadow-sm border-t-4"
      style={{ borderColor }}
    >
      <p className="text-gray-500 text-sm">{title}</p>

      {totalValue && <h1 className="text-3xl pt-1 font-bold">{totalValue}</h1>}

      <h2
        className={`text-lg font-bold  ${
          valueColor ? valueColor : "text-gray-900"
        }`}
      >
        {value}
      </h2>

      {subtitle && <p className="text-md  font-bold">{subtitle}</p>}
    </div>
  );
};

export default StatCard;
