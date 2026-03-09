import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/user";

// ── Types ──
export interface CalendarDay {
  date: string;
  day: number;
  isWeekend: boolean;
  isToday: boolean;
  isFuture: boolean;
  status: "PRESENT" | "ABSENT" | "LATE" | null;
  checkIn: string | null;
  checkOut: string | null;
  workingHours: number | null;
}

export interface TodayPanel {
  date: string;
  status: string;
  checkIn: string | null;
  checkOut: string | null;
  isOnTime: boolean;
  lateMinutes: number | null;
  hoursToday: number;
  isOngoing: boolean;
  department: string | null;
}

export interface MonthlyReportRow {
  rowNumber: number | null;
  date: string;
  dateRaw: string;
  day: string;
  isWeekend: boolean;
  isToday: boolean;
  isFuture: boolean;
  checkIn: string | null;
  checkOut: string | null;
  workingHours: string | null;
  status: string | null;
  note: string | null;
  lateMinutes: number | null;
}

interface MonthlyReportSummary {
  workingDays: number;
  presentDays: number;
  absentDays: number;
  lateArrivals: number;
  totalHours: number;
}

interface AttendanceState {
  // Calendar (daily attendance page)
  calendar: CalendarDay[];
  todayPanel: TodayPanel | null;
  monthlySummary: { present: number; late: number; absent: number } | null;
  calendarLoading: boolean;

  // Monthly report page
  monthlyReport: MonthlyReportRow[];
  monthlyReportSummary: MonthlyReportSummary | null;
  reportLoading: boolean;

  error: string | null;
}

const initialState: AttendanceState = {
  calendar: [],
  todayPanel: null,
  monthlySummary: null,
  calendarLoading: false,
  monthlyReport: [],
  monthlyReportSummary: null,
  reportLoading: false,
  error: null,
};

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// ── Async thunks ──

export const fetchAttendanceCalendar = createAsyncThunk(
  "attendance/fetchCalendar",
  async (
    params: { month: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${BASE_URL}/attendance/calendar?month=${params.month}&year=${params.year}`,
        { headers: authHeader() }
      );
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch calendar");
      return data.data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const fetchMonthlyReport = createAsyncThunk(
  "attendance/fetchMonthlyReport",
  async (
    params: { month: number; year: number },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${BASE_URL}/attendance/report?month=${params.month}&year=${params.year}`,
        { headers: authHeader() }
      );
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch monthly report");
      return data.data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const exportMonthlyReport = createAsyncThunk(
  "attendance/exportMonthlyReport",
  async (
    params: { month: number; year: number; format: "excel" | "pdf" },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(
        `${BASE_URL}/attendance/report/export?month=${params.month}&year=${params.year}&format=${params.format}`,
        { headers: authHeader() }
      );
      if (!res.ok) return rejectWithValue("Export failed");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `attendance-${params.year}-${params.month}.${params.format === "pdf" ? "pdf" : "xlsx"}`;
      a.click();
      window.URL.revokeObjectURL(url);
      return true;
    } catch {
      return rejectWithValue("Export failed");
    }
  }
);

// ── Slice ──
const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Calendar
    builder.addCase(fetchAttendanceCalendar.pending, (state) => {
      state.calendarLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAttendanceCalendar.fulfilled, (state, action) => {
      state.calendarLoading = false;
      state.calendar = action.payload?.calendar || [];
      state.todayPanel = action.payload?.todayPanel || null;
      state.monthlySummary = action.payload?.monthlySummary || null;
    });
    builder.addCase(fetchAttendanceCalendar.rejected, (state, action) => {
      state.calendarLoading = false;
      state.error = action.payload as string;
    });

    // Monthly report
    builder.addCase(fetchMonthlyReport.pending, (state) => {
      state.reportLoading = true;
      state.error = null;
    });
    builder.addCase(fetchMonthlyReport.fulfilled, (state, action) => {
      state.reportLoading = false;
      state.monthlyReport = action.payload?.log || [];
      state.monthlyReportSummary = action.payload?.summary || null;
    });
    builder.addCase(fetchMonthlyReport.rejected, (state, action) => {
      state.reportLoading = false;
      state.error = action.payload as string;
    });
  },
});

export default attendanceSlice.reducer;