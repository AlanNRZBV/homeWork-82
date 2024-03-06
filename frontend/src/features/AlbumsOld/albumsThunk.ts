import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { AlbumAndTrackData } from '../../types';

export const fetchAlbum = createAsyncThunk<
  AlbumAndTrackData | undefined,
  string
>('album/fetch', async (arg) => {
  try {
    const albumInfo = await axiosApi.get(`/albums/${arg}`);
    const tracks = await axiosApi.get(`/tracks?album=${arg}`);

    if (albumInfo && tracks) {
      const data: AlbumAndTrackData = {
        album: albumInfo.data,
        tracks: tracks.data,
      };
      return data;
    }

    return undefined;
  } catch (e) {
    console.log('Caught on try - FETCH ALBUM AND TRACKS - ', e);
  }
});



