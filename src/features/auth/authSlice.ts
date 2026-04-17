import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { clearSession, createDemoSession, readSession, type Session } from './session';

type LoginCredentials = {
  login: string;
  password: string;
};

type AuthState = {
  session: Session | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
};

const initialState: AuthState = {
  session: readSession(),
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk<
  Session,
  LoginCredentials,
  { rejectValue: string }
>('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    return await createDemoSession(credentials);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to log in';
    return rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      clearSession();
      state.session = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.session = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ?? 'Unable to log in';
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
