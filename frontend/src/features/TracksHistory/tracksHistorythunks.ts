import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackHistory } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const fetchTrackHistory = createAsyncThunk<
  TrackHistory[] | undefined,
  undefined,
  { state: RootState }
>('trackHistory/fetch', async (_arg, { getState }) => {
  try {
    const token = getState().users.user?.token;

    console.log('try to fetch with token = ', token);
    const response = await axiosApi.get('/track-history', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH TRACK HISTORY -', e);
  }
});

export const addTrackToHistory = createAsyncThunk<
  TrackHistory,
  string,
  { state: RootState }
>('trackHistory/addHistory', async (arg, { getState }) => {
  try {
    const token = getState().users.user?.token;
    const track ={
      trackId: arg
    }
    const response = await axiosApi.post(`/track-history`, track,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log('Caught on try - ADD TRACK HISTORY -', e);
  }
});
