// batchSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Batch {
  id: number;
  name: string;
  startYear: number;
  endYear: number;
  departmentId: number;
}

const initialState: Batch[] = [];

const batchSlice = createSlice({
  name: 'batch',
  initialState,
  reducers: {
    setBatches: (state, action: PayloadAction<Batch[]>) => {
      return action.payload;
    },
    resetBatches: () => initialState,
  },
});

export const { setBatches, resetBatches } = batchSlice.actions;

export default batchSlice.reducer;
