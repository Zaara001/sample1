import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import adminDashboardReducer from "./slices/adminDashboardSlice";
import employeeReducer from "./slices/employeeSlice";
import departmentReducer from "./slices/departmentSlice";
import alertReducer from "./slices/alertSlice";
import userManagementReducer from "./slices/userManagementSlice";
import attendanceReducer from "./slices/attendanceSlice";
import importReducer from "./slices/importSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminDashboard: adminDashboardReducer,
    employees: employeeReducer,
    departments: departmentReducer,
    alerts: alertReducer,
    userManagement: userManagementReducer,
    attendance: attendanceReducer,
    import: importReducer,
  },
});

// ── Types for use throughout the app ──
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;