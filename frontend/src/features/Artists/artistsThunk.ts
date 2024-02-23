import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Artist } from '../../types';

export const fetchArtists = createAsyncThunk<Artist[] | undefined>(
  'artists/fetch',
  async () => {
    try {
      const response = await axiosApi.get<Artist[]>('/artists');
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH ARTISTS - ', e);
    }
  },
);
