import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/admin";

// ── Types ──
interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  lateToday: number;
  totalDepartments: number;
  dayStatus: "NO_DATA" | "IN_PROGRESS";
}

interface LiveAttendanceItem {
  name: string;
  department: string;
  checkIn: string | null;
  hours: string | null;
  status: string;
}

interface LiveAttendanceResponse {
  dayStatus: "NO_DATA" | "IN_PROGRESS";
  data: LiveAttendanceItem[];
}

interface TrendItem {
  day: string;
  date: string;
  attendance: number;
}

interface DepartmentAttendanceItem {
  name: string;
  percent: number;
}

interface AdminDashboardState {
  stats: DashboardStats | null;
  liveAttendance: LiveAttendanceResponse | null;
  trend: TrendItem[];
  departmentAttendance: DepartmentAttendanceItem[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminDashboardState = {
  stats: null,
  liveAttendance: null,
  trend: [],
  departmentAttendance: [],
  loading: false,
  error: null,
};

// ── Helper: get auth header ──
const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// ── Async thunks ──

export const fetchAdminDashboardStats = createAsyncThunk(
  "adminDashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/dashboard`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch dashboard");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const fetchLiveAttendance = createAsyncThunk(
  "adminDashboard/fetchLiveAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/attendance/today`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch live attendance");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const fetchAttendanceTrend = createAsyncThunk(
  "adminDashboard/fetchTrend",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/attendance-trend`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch trend");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const fetchDepartmentAttendance = createAsyncThunk(
  "adminDashboard/fetchDepartmentAttendance",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/departments`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch departments");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// ── Slice ──
const adminDashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Stats
    builder.addCase(fetchAdminDashboardStats.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminDashboardStats.fulfilled, (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    });
    builder.addCase(fetchAdminDashboardStats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Live attendance
    builder.addCase(fetchLiveAttendance.fulfilled, (state, action) => {
      state.liveAttendance = action.payload;
    });

    // Trend
    builder.addCase(fetchAttendanceTrend.fulfilled, (state, action) => {
      state.trend = Array.isArray(action.payload)
        ? action.payload.filter(
            (item: TrendItem) => item.day !== "Sat" && item.day !== "Sun"
          )
        : [];
    });

    // Department attendance
    builder.addCase(fetchDepartmentAttendance.fulfilled, (state, action) => {
      state.departmentAttendance = action.payload?.data || [];
    });
  },
});

export default adminDashboardSlice.reducer;