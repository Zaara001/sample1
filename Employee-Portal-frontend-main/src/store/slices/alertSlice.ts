import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/admin";

// ── Types ──
export interface Alert {
  id: string;
  type: "CRITICAL" | "WARNING" | "INFO";
  category: string;
  title: string;
  message: string;
  isRead: boolean;
  isResolved: boolean;
  createdAt: string;
}

export interface AlertSettings {
  deptBelowThresholdEnabled: boolean;
  employeeAbsentEnabled: boolean;
  newUserEnabled: boolean;
  monthlyReportEnabled: boolean;
}

export interface ThresholdConfig {
  minAttendanceRate: number;
  lateArrivalLimit: number;
  consecutiveAbsenceDays: number;
}

interface AlertSummary {
  critical: number;
  warning: number;
  info: number;
  resolved: number;
}

interface AlertState {
  alerts: Alert[];
  summary: AlertSummary;
  settings: AlertSettings | null;
  thresholds: ThresholdConfig | null;
  loading: boolean;
  error: string | null;
  saveSuccess: string | null;
}

const initialState: AlertState = {
  alerts: [],
  summary: { critical: 0, warning: 0, info: 0, resolved: 0 },
  settings: null,
  thresholds: null,
  loading: false,
  error: null,
  saveSuccess: null,
};

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// ── Async thunks ──

export const fetchAlertDashboard = createAsyncThunk(
  "alerts/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/alert`, {
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch alerts");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const markAllAlertsRead = createAsyncThunk(
  "alerts/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/alert/read-all`, {
        method: "PATCH",
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to mark alerts read");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const resolveAlert = createAsyncThunk(
  "alerts/resolve",
  async (alertId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/alert/${alertId}/resolve`, {
        method: "PATCH",
        headers: authHeader(),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to resolve alert");
      return alertId;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const updateAlertSettings = createAsyncThunk(
  "alerts/updateSettings",
  async (settings: AlertSettings, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/alert/settings`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(settings),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update settings");
      return settings;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const updateThresholds = createAsyncThunk(
  "alerts/updateThresholds",
  async (thresholds: ThresholdConfig, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/alert/thresholds`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(thresholds),
      });
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to update thresholds");
      return thresholds;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// ── Slice ──
const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    clearAlertMessages(state) {
      state.saveSuccess = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch dashboard
    builder.addCase(fetchAlertDashboard.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAlertDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.alerts = action.payload.alerts || [];
      state.summary = action.payload.summary || state.summary;
      state.settings = action.payload.settings || null;
      state.thresholds = action.payload.thresholds || null;
    });
    builder.addCase(fetchAlertDashboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Mark all read
    builder.addCase(markAllAlertsRead.fulfilled, (state) => {
      state.alerts = state.alerts.map((a) => ({ ...a, isRead: true }));
    });

    // Resolve one alert
    builder.addCase(resolveAlert.fulfilled, (state, action) => {
      state.alerts = state.alerts.map((a) =>
        a.id === action.payload ? { ...a, isResolved: true } : a
      );
    });

    // Update settings
    builder.addCase(updateAlertSettings.fulfilled, (state, action) => {
      state.settings = action.payload;
      state.saveSuccess = "Alert settings saved successfully.";
    });
    builder.addCase(updateAlertSettings.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Update thresholds
    builder.addCase(updateThresholds.fulfilled, (state, action) => {
      state.thresholds = action.payload;
      state.saveSuccess = "Thresholds updated successfully.";
    });
    builder.addCase(updateThresholds.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearAlertMessages } = alertSlice.actions;
export default alertSlice.reducer;