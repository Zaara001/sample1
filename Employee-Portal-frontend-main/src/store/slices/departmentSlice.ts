import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/admin";

// ── Types ──
export interface Department {
  id: string;
  name: string;
  totalEmployees: number;
  createdAt: string;
}

export interface DepartmentReport {
  name: string;
  totalEmployees: number;
  present: number;
  absent: number;
  late: number;
  notCheckedIn: number;
  avgHours: number;
  attendanceRate: number;
  onTimeRate: number;
}

interface DepartmentState {
  list: Department[];
  report: DepartmentReport[];
  reportSummary: {
    totalDepartments: number;
    totalEmployees: number;
    bestDepartment: string | null;
    lowestDepartment: string | null;
  } | null;
  loading: boolean;
  addLoading: boolean;
  error: string | null;
  addError: string | null;
  addSuccess: string | null;
}

const initialState: DepartmentState = {
  list: [],
  report: [],
  reportSummary: null,
  loading: false,
  addLoading: false,
  error: null,
  addError: null,
  addSuccess: null,
};

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// ── Async thunks ──

// Get simple department list (for dropdowns + management)
export const fetchDepartments = createAsyncThunk(
  "departments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/departments`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch departments");
      return data.data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// Get department attendance report (for department page)
export const fetchDepartmentReport = createAsyncThunk(
  "departments/fetchReport",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/department-report`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch department report");
      return data.data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// Add new department
export const addDepartment = createAsyncThunk(
  "departments/add",
  async (name: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/departments`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify({ name }),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to add department");
      return data.data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// Add single employee to department
export const addEmployeeToDepartment = createAsyncThunk(
  "departments/addEmployee",
  async (
    payload: {
      departmentId: string;
      employee: {
        name: string;
        email: string;
        employeeId: string;
        designation: string;
        joinedDate: string;
        deviceId: string;
        fingerprintRegistered: boolean;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${BASE_URL}/departments/${payload.departmentId}/employees`,
        {
          method: "POST",
          headers: authHeader(),
          body: JSON.stringify(payload.employee),
        }
      );
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to add employee");
      return data.data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// Bulk add employees via file
export const bulkAddEmployees = createAsyncThunk(
  "departments/bulkAdd",
  async (
    payload: { departmentId: string; file: File },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("file", payload.file);

      const res = await fetch(
        `${BASE_URL}/departments/${payload.departmentId}/employees/bulk`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Bulk import failed");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// ── Slice ──
const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    clearDepartmentMessages(state) {
      state.addError = null;
      state.addSuccess = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch list
    builder.addCase(fetchDepartments.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDepartments.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload || [];
    });
    builder.addCase(fetchDepartments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch report
    builder.addCase(fetchDepartmentReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDepartmentReport.fulfilled, (state, action) => {
      state.loading = false;
      state.report = action.payload?.departments || [];
      state.reportSummary = action.payload?.summary || null;
    });
    builder.addCase(fetchDepartmentReport.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Add department
    builder.addCase(addDepartment.pending, (state) => {
      state.addLoading = true;
      state.addError = null;
      state.addSuccess = null;
    });
    builder.addCase(addDepartment.fulfilled, (state, action) => {
      state.addLoading = false;
      state.addSuccess = `Department "${action.payload.name}" created successfully.`;
      state.list.push(action.payload);
    });
    builder.addCase(addDepartment.rejected, (state, action) => {
      state.addLoading = false;
      state.addError = action.payload as string;
    });

    // Add single employee
    builder.addCase(addEmployeeToDepartment.pending, (state) => {
      state.addLoading = true;
      state.addError = null;
      state.addSuccess = null;
    });
    builder.addCase(addEmployeeToDepartment.fulfilled, (state, action) => {
      state.addLoading = false;
      state.addSuccess = `Employee "${action.payload.name}" added successfully.`;
    });
    builder.addCase(addEmployeeToDepartment.rejected, (state, action) => {
      state.addLoading = false;
      state.addError = action.payload as string;
    });

    // Bulk add employees
    builder.addCase(bulkAddEmployees.pending, (state) => {
      state.addLoading = true;
      state.addError = null;
      state.addSuccess = null;
    });
    builder.addCase(bulkAddEmployees.fulfilled, (state, action) => {
      state.addLoading = false;
      state.addSuccess = `Bulk import complete. ${action.payload.data?.imported} employee(s) added.`;
    });
    builder.addCase(bulkAddEmployees.rejected, (state, action) => {
      state.addLoading = false;
      state.addError = action.payload as string;
    });
  },
});

export const { clearDepartmentMessages } = departmentSlice.actions;
export default departmentSlice.reducer;