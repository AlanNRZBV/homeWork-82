import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackReduced } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchTracksByAlbum = createAsyncThunk<TrackReduced[], string>(
  'tracks/fetchTracksByAlbum',
  async (arg) => {
    try {
      const response = await axiosApi.get(`/tracks?album=${arg}`);
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH TRACKS - ', e);
    }
  },
);