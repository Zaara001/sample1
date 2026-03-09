const UserFilters = () => {
  return (
    <div className="flex gap-4 mt-6">
      <select className="border rounded-xl px-4 py-2 bg-white">
        <option>All Departments</option>
      </select>

      <select className="border rounded-xl px-4 py-2 bg-white">
        <option>All Auth Types</option>
      </select>

      <select className="border rounded-xl px-4 py-2 bg-white">
        <option>All Roles</option>
      </select>

      <button className="border border-blue-600 text-blue-600 px-6 rounded-xl">
        Filter
      </button>
    </div>
  );
};

export default UserFilters;