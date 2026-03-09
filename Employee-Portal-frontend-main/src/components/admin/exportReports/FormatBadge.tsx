interface Props {
  format: "Excel" | "PDF" | "CSV";
}

const FormatBadge = ({ format }: Props) => {
  const styles = {
    Excel: "bg-green-100 text-green-600",
    PDF: "bg-red-100 text-red-600",
    CSV: "bg-cyan-100 text-cyan-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[format]}`}>
      {format}
    </span>
  );
};

export default FormatBadge;