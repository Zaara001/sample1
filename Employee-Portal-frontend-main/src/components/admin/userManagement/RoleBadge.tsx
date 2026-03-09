interface Props {
  role: "Admin" | "Employee";
}

const RoleBadge = ({ role }: Props) => {
  const styles = {
    Admin: "bg-red-100 text-red-600",
    Employee: "bg-gray-100 text-gray-600",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm ${styles[role]}`}>
      {role}
    </span>
  );
};

export default RoleBadge;