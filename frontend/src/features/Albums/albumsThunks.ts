import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumAndTrackData } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchAlbumsByArtist = createAsyncThunk<Album[] | undefined,
  string
>('albums/fetchByArtist', async (arg) => {
  try {
    const response = await axiosApi.get(`/albums?artist=${arg}`)
    return response.data
  } catch (e) {
    console.log('Caught on try - FETCH ALBUMS - ', e);
  }
});

export const fetchExtendedAlbum = createAsyncThunk<AlbumAndTrackData | undefined, string>(
  'albums/fetchSingleAlbum',
  async(arg)=>{
    try {
      const tracks = await axiosApi.get(`/tracks?album=${arg}`)
      const album = await axiosApi.get(`/albums/${arg}`)
      const data: AlbumAndTrackData = {
        album: album.data,
        tracks: tracks.data
      }
      return data
    }catch (e) {
      console.log('Caught on try - FETCH ALBUM - ', e);
    }
  }
)



