import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { albumState, isAlbumLoading } from './albumsSlice.ts';
import { useParams } from 'react-router-dom';
import { fetchSingleAlbum } from './albumsThunks.ts';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { apiURL } from '../../constants.ts';
import Image from 'mui-image';
import Tracks from '../Tracks/Tracks.tsx';

const AlbumExtended = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(albumState);
  const isLoading = useAppSelector(isAlbumLoading);
  const albumId = useParams();
  const id: string | undefined = albumId?.id;

  let cardImage = imageNotAvailable;


  if (state.cover) {
    cardImage = apiURL + '/' + state.cover;
  }

  useEffect(() => {
    dispatch(fetchSingleAlbum(id as string));
  }, [id, dispatch]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box
          sx={{
            border: '1px solid grey',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Image src={cardImage} alt={`${state.title} state image`} />
          <Box>
            <Box ml={2} mt={1}>
              <Typography variant="h5">{state.artistId?.name}</Typography>
              <Typography variant="h6">{state.title}</Typography>
            </Box>
            <Tracks albumId={id as string} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AlbumExtended;
