import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchArtist = createAsyncThunk<Album[], string>(
  'artist/fetch',
  async (arg) => {
    try {
      const response = await axiosApi.get<Album[]>(`/albums?artist=${arg}`);
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH ARTIST - ', e);
    }
  },
);
