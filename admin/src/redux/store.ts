import { configureStore } from '@reduxjs/toolkit';
import batchReducer from './batchSlice';
const store = configureStore({
  reducer: {
    Batch:batchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; 
export default store;
