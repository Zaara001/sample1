import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  color?: "green" | "blue" | "yellow" | "red"; // ✅ controlled colors
  icon: LucideIcon;
}

const colorStyles = {
  green: {
    border: "border-green-500",
    bg: "bg-green-100",
    text: "text-green-500",
  },
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-100",
    text: "text-blue-500",
  },
  yellow: {
    border: "border-yellow-500",
    bg: "bg-yellow-100",
    text: "text-yellow-500",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-100",
    text: "text-red-500",
  },
};

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  color = "blue",
  icon: Icon,
}) => {
  const styles = colorStyles[color];

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm p-5 border-t-4 ${styles.border}`}
    >
      <div className={`p-3 rounded-md w-11 ${styles.bg}`}>
        <Icon className={styles.text} size={20} />
      </div>
      <div className="flex justify-between items-center my-2">
        <h3 className="text-sm text-gray-500">{title}</h3>
      </div>

      <p className="text-3xl font-semibold text-gray-800">{value}</p>
      <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
};

export default StatCard;
