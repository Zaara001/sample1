import { Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import DailyAttendance from "./pages/user/DailyAttendence";
import MonthlyReport from "./pages/user/MonthlyReport";
import Analytics from "./pages/user/Analytics";
import Profile from "./pages/user/Profile";
import Settings from "./pages/user/Settings";

import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AllEmployees from "./pages/admin/AllEmployees";
import AlertsPage from "./pages/admin/Alerts";
import DepartmentsPage from "./pages/admin/Departments";
import EmployeeDetailPage from "./pages/admin/EmployeeDetail";
import ExportReportsPage from "./pages/admin/ExportReports";
import UserManagementPage from "./pages/admin/UserManagement";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* EMPLOYEE ROUTES */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute role="employee">
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="daily-attendance" element={<DailyAttendance />} />
        <Route path="monthly-report" element={<MonthlyReport />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="employees" element={<AllEmployees />} />
        <Route path="alert-page" element={<AlertsPage />} />
        <Route path="department-page" element={<DepartmentsPage />} />
        <Route path="employee-detail-page" element={<EmployeeDetailPage />} />
        <Route path="export-report-page" element={<ExportReportsPage />} />
        <Route path="user-management-page" element={<UserManagementPage />} />
      </Route>
    </Routes>
  );
}

export default App;
