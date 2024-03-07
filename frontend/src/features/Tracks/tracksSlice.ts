import { TrackReduced } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchTracksByAlbum } from './tracksThunks.ts';

interface TracksState{
  tracks:TrackReduced[]
  isLoading: boolean
}

const initialState: TracksState = {
  tracks:[],
  isLoading:false
}

export const tracksSlice = createSlice({
  name:'tracks',
  initialState,
  reducers:{},extraReducers:builder => {
    builder.addCase(fetchTracksByAlbum.pending, (state)=>{
      state.isLoading = true
    });
    builder.addCase(fetchTracksByAlbum.fulfilled, (state,{payload:tracks})=>{
      state.isLoading = false
      state.tracks = tracks
    });
    builder.addCase(fetchTracksByAlbum.rejected, (state)=>{
      state.isLoading = false
    });
  }
})

export const tracksReducer = tracksSlice.reducer
export const tracksState = (state: RootState)=>state.tracks.tracks
export const isTracksLoading = (state: RootState)=>state.tracks.isLoading