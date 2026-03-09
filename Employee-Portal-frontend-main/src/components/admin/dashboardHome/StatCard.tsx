import React from "react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  color?: "green" | "blue" | "yellow" | "red";
  icon: LucideIcon;
}

const colorStyles = {
  green: {
    border: "border-green-500",
    bg: "bg-green-100",
    text: "text-green-600",
  },
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  yellow: {
    border: "border-yellow-500",
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-100",
    text: "text-red-600",
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
      className={`bg-white rounded-2xl shadow-sm p-6 border-t-4 ${styles.border} transition-all hover:shadow-md`}
    >
      {/* Icon */}
      <div className={`p-3 rounded-xl w-fit ${styles.bg}`}>
        <Icon className={styles.text} size={20} />
      </div>

      {/* Title */}
      <h3 className="text-sm text-gray-500 mt-4">{title}</h3>

      {/* Value */}
      <p className="text-3xl font-semibold text-gray-800 mt-1">{value}</p>

      {/* Subtitle */}
      <p className="text-sm text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
};

export default StatCard;
