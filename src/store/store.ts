import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../slices/ThemeSlice';
import commentsReducer from '../slices/commentsSlice';
import designersReducer from '../slices/designersSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    comments: commentsReducer,
    designers: designersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
