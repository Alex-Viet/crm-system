import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchComments } from '../api/api';
import { RootState } from '../store/store';

interface DesignerData {
  avatar: string | null | undefined;
  username: string;
}

export interface CommentsData {
  date_created: string | null;
  designer: DesignerData;
  id: number;
  issue: string | null;
  message: string | null;
}

export interface CommentsState {
  data: CommentsData[];
  status: string;
  error: string | undefined | null;
}

const initialState: CommentsState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchCommentsThunk = createAsyncThunk<
  CommentsData[],
  void,
  { state: RootState }
>('comments/fetchComments', async () => {
  const response = await fetchComments();
  return response;
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCommentsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
