import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/admin";

// ── Types ──
export interface ManagedUser {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  role: string;
  lastLogin: string | null;
  status: string;
}

interface UserSummary {
  total: number;
  active: number;
  inactive: number;
}

interface UserManagementState {
  users: ManagedUser[];
  summary: UserSummary;
  pagination: { total: number; page: number; limit: number; totalPages: number };
  loading: boolean;
  deactivateLoading: boolean;
  error: string | null;
  deactivateError: string | null;
  deactivateSuccess: string | null;
}

const initialState: UserManagementState = {
  users: [],
  summary: { total: 0, active: 0, inactive: 0 },
  pagination: { total: 0, page: 1, limit: 10, totalPages: 1 },
  loading: false,
  deactivateLoading: false,
  error: null,
  deactivateError: null,
  deactivateSuccess: null,
};

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
});

// ── Async thunks ──

export const fetchUsers = createAsyncThunk(
  "userManagement/fetchUsers",
  async (
    params: {
      page?: number;
      limit?: number;
      search?: string;
      department?: string;
      status?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams();
      if (params.page) query.set("page", String(params.page));
      if (params.limit) query.set("limit", String(params.limit));
      if (params.search) query.set("search", params.search);
      if (params.department) query.set("department", params.department);
      if (params.status) query.set("status", params.status);

      const res = await fetch(
        `${BASE_URL}/user-management?${query.toString()}`,
        { headers: authHeader() }
      );
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to fetch users");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const deactivateUser = createAsyncThunk(
  "userManagement/deactivate",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/user-management/${userId}/deactivate`,
        {
          method: "PATCH",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Failed to deactivate user");
      return userId;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// ── Slice ──
const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    clearUserManagementMessages(state) {
      state.deactivateError = null;
      state.deactivateSuccess = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.data || [];
      state.summary = action.payload.summary || state.summary;
      state.pagination = action.payload.pagination || state.pagination;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Deactivate user
    builder.addCase(deactivateUser.pending, (state) => {
      state.deactivateLoading = true;
      state.deactivateError = null;
      state.deactivateSuccess = null;
    });
    builder.addCase(deactivateUser.fulfilled, (state, action) => {
      state.deactivateLoading = false;
      state.deactivateSuccess = "User deactivated successfully.";
      // Update the user status in the list immediately
      state.users = state.users.map((u) =>
        u.id === action.payload ? { ...u, status: "INACTIVE" } : u
      );
    });
    builder.addCase(deactivateUser.rejected, (state, action) => {
      state.deactivateLoading = false;
      state.deactivateError = action.payload as string;
    });
  },
});

export const { clearUserManagementMessages } = userManagementSlice.actions;
export default userManagementSlice.reducer;