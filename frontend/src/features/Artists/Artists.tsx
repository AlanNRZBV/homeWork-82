import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { artistsState, isArtistsLoading } from './artistsSlice.ts';
import { Box, CircularProgress } from '@mui/material';
import ArtistsItem from './components/ArtistsItem.tsx';
import { useEffect } from 'react';
import { fetchArtists } from './artistsThunks.ts';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(artistsState);
  const isLoading = useAppSelector(isArtistsLoading);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

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
        artists.map((item) => (
          <ArtistsItem
            _id={item._id}
            name={item.name}
            image={item.image}
            information={item.information}
            key={item._id}
            isPublished={item.isPublished}
          />
        ))
      )}
    </Box>
  );
};

export default Artists;
