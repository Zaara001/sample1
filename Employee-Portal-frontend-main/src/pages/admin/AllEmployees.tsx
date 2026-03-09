import { useEffect, useState } from "react";
import EmployeesHeader from "../../components/admin/allEmployees/EmployeesHeader";
import EmployeeTable from "../../components/admin/allEmployees/EmployeeTable";
import Pagination from "../../components/admin/allEmployees/Pagination";
import type { Employee } from "../../types/employee";

type ViewType = "active" | "inactive";

const ITEMS_PER_PAGE = 7;

const AllEmployees = () => {
  // ✅ Proper Local Today Date (Timezone Safe)
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
  const formattedToday = today.toISOString().split("T")[0];

  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  const [view, setView] = useState<ViewType>("active");
  const [department, setDepartment] = useState<string>("all");

  // ✅ Today selected by default
  const [selectedDate, setSelectedDate] = useState<string>(formattedToday);

  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Fetch employees (Normal + Date Filter)
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

        let url = "http://localhost:5000/api/admin/employees";

        if (selectedDate) {
          url = `http://localhost:5000/api/admin/employees-by-date?date=${selectedDate}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch employees");

        const data: Employee[] = await res.json();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [selectedDate]);

  // ✅ Unique departments
  const departments = [
    "all",
    ...Array.from(new Set(employees.map((e) => e.department))),
  ];

  // ✅ Filter logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesView =
      view === "active"
        ? emp.account?.toLowerCase() === "active"
        : emp.account?.toLowerCase() === "inactive";

    const matchesDepartment =
      department === "all" || emp.department === department;

    return matchesView && matchesDepartment;
  });

  // ✅ Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [view, department, selectedDate]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);

  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-1 space-y-6 p-6">
        <EmployeesHeader
          view={view}
          setView={setView}
          department={department}
          setDepartment={setDepartment}
          departments={departments}
          count={filteredEmployees.length}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {loading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <EmployeeTable employees={paginatedEmployees} view={view} />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredEmployees.length}
          itemsPerPage={ITEMS_PER_PAGE}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default AllEmployees;
