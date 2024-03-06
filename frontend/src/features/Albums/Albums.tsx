import { Box, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { albumsState, isAlbumsLoading } from './albumsSlice.ts';
import AlbumsItem from './components/AlbumsItem.tsx';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumsByArtist } from './albumsThunks.ts';

const Albums = () => {

  const dispatch=useAppDispatch();
  const albums = useAppSelector(albumsState);
  const isLoading = useAppSelector(isAlbumsLoading);
  const artistId = useParams()

  useEffect(() => {
    dispatch(fetchAlbumsByArtist(artistId.id as string))
  }, [artistId.id, dispatch]);


  return (
    <Box
      mt={2}
      gap={2}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6,1fr)',
        gridTemplateRows: 'repeat(auto,1fr)',
      }}
    >
      {isLoading ? (
        <CircularProgress />
      ) : (
        albums.map((item) => (
          <AlbumsItem
            _id={item._id}
            title={item.title}
            cover={item.cover}
            releaseDate={item.releaseDate}
            key={item._id}
          />
        ))
      )}
    </Box>
  );
};

export default Albums;