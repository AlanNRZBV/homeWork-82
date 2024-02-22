import Grid from '@mui/material/Unstable_Grid2'
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { artistsLoading, artistsState } from './artistsSlice.ts';
import { CircularProgress } from '@mui/material';
import ArtistsItem from './ArtistsItem.tsx';
import { useEffect } from 'react';
import { fetchArtists } from './artistsThunk.ts';
const Artists = () => {

  const dispatch = useAppDispatch();
  const artists = useAppSelector(artistsState);
  const isLoading = useAppSelector(artistsLoading)

  useEffect(() => {
    dispatch(fetchArtists())
  }, [dispatch]);
  
  return (
    <Grid container spacing={2} sx={{mt:5}}>
      {isLoading ? (<CircularProgress />) :
        (artists.map(item => (
          <ArtistsItem _id={item._id} name={item.name} image={item.image} information={item.information} key={item._id}/>
        )))}
    </Grid>
  );
};

export default Artists;