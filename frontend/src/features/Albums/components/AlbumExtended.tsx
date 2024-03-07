import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { albumExtendedState, isExtendedAlbumsLoading } from '../albumsSlice.ts';
import { useParams } from 'react-router-dom';
import { fetchExtendedAlbum } from '../albumsThunks.ts';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants.ts';
import Image from 'mui-image';
import CustomListItem from './CustomListItem.tsx';

const AlbumExtended = () => {
  const dispatch = useAppDispatch();
  const { album, tracks } = useAppSelector(albumExtendedState);
  const isLoading = useAppSelector(isExtendedAlbumsLoading);
  const albumId = useParams();

  let cardImage = imageNotAvailable;

  if (album.cover) {
    cardImage = apiURL + '/' + album.cover;
  }

  useEffect(() => {
    dispatch(fetchExtendedAlbum(albumId.id as string));
  }, [albumId.id, dispatch]);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt={2}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ border: '1px solid grey' , borderRadius: '8px', overflow:'hidden'}}>
          <Image src={cardImage} alt={`${album.title} album image`} />
          <Box>
            <Box ml={2} mt={1}>
          <Typography variant="h5">{album.artistId?.name}</Typography>
          <Typography variant="h6">{album.title}</Typography>
            </Box>
          <ul style={{padding:'0', marginTop:'0'}}>
            {tracks.map((item) => (
              <CustomListItem
                title={item.title}
                duration={item.duration}
                key={item._id}
                _id={item._id}
              />
            ))}
          </ul>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AlbumExtended;
