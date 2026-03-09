import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:5000/api/admin";

// ── Types ──
interface ImportResult {
  totalRows: number;
  imported: number;
  skippedNotFound: number;
  skippedInvalidDate: number;
  errors: { row: number; reason: string }[];
}

interface ImportState {
  result: ImportResult | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ImportState = {
  result: null,
  loading: false,
  error: null,
  success: null,
};

// ── Async thunk ──
export const importBiometricFile = createAsyncThunk(
  "import/biometric",
  async (file: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BASE_URL}/import`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) return rejectWithValue(data.message || "Import failed");
      return data;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

// ── Slice ──
const importSlice = createSlice({
  name: "import",
  initialState,
  reducers: {
    clearImportState(state) {
      state.result = null;
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(importBiometricFile.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = null;
      state.result = null;
    });
    builder.addCase(importBiometricFile.fulfilled, (state, action) => {
      state.loading = false;
      state.result = action.payload.data;
      state.success = action.payload.message;
    });
    builder.addCase(importBiometricFile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearImportState } = importSlice.actions;
export default importSlice.reducer;