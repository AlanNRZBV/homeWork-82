import { GetTrackHistoryResponse } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchTrackHistory } from './tracksHistorythunks.ts';

interface TracksHistoryState {
  history: GetTrackHistoryResponse[];
  isLoading: boolean;
}

const initialState: TracksHistoryState = {
  history: [],
  isLoading: false,
};

export const tracksHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrackHistory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTrackHistory.fulfilled, (state,{payload: history}) => {
      if(history){
        state.history = history
      }
      state.isLoading = false;
    });
    builder.addCase(fetchTrackHistory.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export const tracksHistoryReducer = tracksHistorySlice.reducer;
export const historyState = (state: RootState) => state.tracksHistory.history;
export const trackHistoryLoading = (state: RootState) =>
  state.tracksHistory.isLoading;
