import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../slices/ThemeSlice';
import commentsReducer from '../slices/commentsSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
