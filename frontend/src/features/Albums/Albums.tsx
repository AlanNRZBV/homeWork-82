import  { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import {
  albumLoading,
  albumState,
  tracksLoading,
  tracksState,
} from './albumsSlice.ts';
import {
  Box,
  CircularProgress,
  List,
  Typography,
} from '@mui/material';
import imageNotAvailable from '../../assets/images/image_not_available.png';
import { apiURL } from '../../constants.ts';
import { useParams } from 'react-router-dom';
import { fetchAlbum } from './albumsThunk.ts';
import CustomListItem from './CustomListItem.tsx';

const Albums = () => {
  const dispatch = useAppDispatch();
  const album = useAppSelector(albumState);
  const tracks = useAppSelector(tracksState);
  const isAlbumLoading = useAppSelector(albumLoading);
  const isTracksLoading = useAppSelector(tracksLoading);
  const albumId = useParams();

  let cardImage = imageNotAvailable;

  useEffect(() => {
    dispatch(fetchAlbum(albumId.id as string));
  }, [albumId.id, dispatch]);

  if (
    isAlbumLoading ||
    (isTracksLoading && album === null) ||
    tracks.length === 0
  ) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }

  if (album?.cover) {
    cardImage = apiURL + '/' + album.cover;
  }

  return (
    <Box
      component="div"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ mt: 5 }}
    >
      <Box component="div" display="flex" flexDirection="column">
        <img src={cardImage} alt={album?.title} />
        <Typography variant="h4">{album?.artistId.name}</Typography>
        <Typography variant="h4">{album?.title}</Typography>
        <List>
          {tracks.map((item) => (
            <CustomListItem title={item.title} key={item._id}  />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Albums;
