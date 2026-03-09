
const MonthlySummaryCards = () => {
  const cards = [
    { title: "Working Days", value: "17", color: "border-blue-500" },
    { title: "Present Days", value: "13", color: "border-green-500" },
    { title: "Absent Days", value: "1", color: "border-red-500" },
    { title: "Late Arrivals", value: "2", color: "border-yellow-500" },
    { title: "Total Hours", value: "112h", color: "border-indigo-500" },
  ];

  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`bg-white p-5 rounded-xl shadow border-t-4 ${card.color}`}
        >
          <p className="text-gray-500 text-sm">{card.title}</p>
          <h3 className="text-2xl font-bold mt-2">{card.value}</h3>
        </div>
      ))}
    </div>
  );
};

export default MonthlySummaryCards;
