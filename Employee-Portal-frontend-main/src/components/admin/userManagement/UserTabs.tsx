import type { Employee } from "../../../types/employee";

interface Props {
  users: Employee[];
}

const UserTabs = ({ users }: Props) => {
  const total = users.length;
  const active = users.filter((u) => u.account === "Active").length;
  const inactive = users.filter((u) => u.account === "Inactive").length;
  const pending = users.filter((u) => u.account === "Pending").length;

  return (
    <div className="flex gap-6 mt-6">
      <button className="bg-white px-6 py-3 rounded-xl shadow font-medium text-blue-600">
        All Users ({total})
      </button>
      <button className="text-gray-500">Active ({active})</button>
      <button className="text-gray-500">Inactive ({inactive})</button>
      <button className="text-gray-500">⏳ Pending ({pending})</button>
    </div>
  );
};

export default UserTabs;
