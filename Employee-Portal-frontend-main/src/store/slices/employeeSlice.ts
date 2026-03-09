import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/admin";

// ── Types ──
export interface Employee {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  role: string;
  status: string;
  checkIn: string | null;
  checkOut: string | null;
  hours: number;
  isLate: boolean;
  todayStatus: string;
}

interface EmployeeDetail {
  profile: {
    name: string;
    employeeId: string;
    role: string;
    department: string;
    status: string;
  };
  monthlySummary: {
    presentDays: number;
    absentDays: number;
    lateDays: number;
    totalHours: number;
    avgHours: number;
  } | null;
  attendance: {
    date: string;
    checkIn: string | null;
    checkOut: string | null;
    status: string;
    workingHours: number | null;
  }[];
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
}

interface EmployeeState {
  list: Employee[];
  pagination: Pagination;
  selectedEmployee: EmployeeDetail | null;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  list: [],
  pagination: { total: 0, page: 1, limit: 7 },
  selectedEmployee: null,
  loading: false,
  detailLoading: false,
  error: null,
};

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// ── Async thunks ──

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      department?: string;
      status?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams();
      if (params.page) query.set("page", String(params.page));
      if (params.limit) query.set("limit", String(params.limit));
      if (params.search) query.set("search", params.search);
      if (params.department && params.department !== "all")
        query.set("department", params.department);
      if (params.status && params.status !== "all")
        query.set("status", params.status);

      const res = await fetch(`${BASE_URL}/employees?${query.toString()}`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch employees");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchById",
  async (
    params: { id: string; month?: string },
    { rejectWithValue }
  ) => {
    try {
      const query = params.month ? `?month=${params.month}` : "";
      const res = await fetch(`${BASE_URL}/employees/${params.id}${query}`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch employee");
      return data.data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// ── Slice ──
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    clearSelectedEmployee(state) {
      state.selectedEmployee = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.data || [];
      state.pagination = action.payload.pagination || state.pagination;
    });
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch by ID
    builder.addCase(fetchEmployeeById.pending, (state) => {
      state.detailLoading = true;
    });
    builder.addCase(fetchEmployeeById.fulfilled, (state, action) => {
      state.detailLoading = false;
      state.selectedEmployee = action.payload;
    });
    builder.addCase(fetchEmployeeById.rejected, (state, action) => {
      state.detailLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearSelectedEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;