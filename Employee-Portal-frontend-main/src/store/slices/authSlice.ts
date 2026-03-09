import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api";

// ── Types ──
interface AuthState {
  token: string | null;
  role: string | null;
  userId: string | null;
  loading: boolean;
  error: string | null;
}

// ── Initial state — rehydrate from localStorage ──
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  userId: localStorage.getItem("userId"),
  loading: false,
  error: null,
};

// ── Async thunk: Login ──
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      return data; // { accessToken, user: { id, email, role } }
    } catch {
      return rejectWithValue("Network error. Please try again.");
    }
  }
);

// ── Async thunk: Logout ──
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (refreshToken) {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    }).catch(() => {}); // silently fail
  }
});

// ── Slice ──
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Clear error manually
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ── Login ──
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.accessToken;
      state.role = action.payload.user.role.toLowerCase();
      state.userId = action.payload.user.id;

      // Persist to localStorage
      localStorage.setItem("token", action.payload.accessToken);
      localStorage.setItem("role", action.payload.user.role.toLowerCase());
      localStorage.setItem("userId", action.payload.user.id);

      // Store refresh token if present
      if (action.payload.refreshToken) {
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // ── Logout ──
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.token = null;
      state.role = null;
      state.userId = null;

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("userId");
      localStorage.removeItem("refreshToken");
    });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;