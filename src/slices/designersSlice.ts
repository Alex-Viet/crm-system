import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../api/api';
import { RootState } from '../store/store';
import axios from 'axios';

export interface DesignerData {
  avatar: string | null | undefined;
  username: string;
  email: string;
  issues: {
    date_started_by_designer: string;
    date_finished_by_designer: string;
    status: string;
  }[];
}

export interface DesignersState {
  designers: DesignerData[];
  status: string;
  error: string | undefined | null;
}

const initialState: DesignersState = {
  designers: [],
  status: 'idle',
  error: null,
};

export const fetchAllDesignersThunk = createAsyncThunk<
  DesignerData[],
  void,
  { state: RootState }
>('designers/fetchAllDesigners', async () => {
  let allDesigners: DesignerData[] = [];
  let nextUrl = `${API_URL}designer/?limit=128`;

  while (nextUrl) {
    const response = await axios.get(nextUrl);
    allDesigners = [...allDesigners, ...response.data.results];
    nextUrl = response.data.next;
  }

  return allDesigners;
});

const designersSlice = createSlice({
  name: 'designers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDesignersThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllDesignersThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.designers = action.payload;
      })
      .addCase(fetchAllDesignersThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default designersSlice.reducer;
