import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { artistLoading, artistState } from './artistSlice.tsx';
import Grid from '@mui/material/Unstable_Grid2'
import { Button, CircularProgress, Typography } from '@mui/material';
import AlbumItem from './AlbumItem.tsx';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchArtist } from './artistThunk.ts';

const Artist = () => {
  const dispatch = useAppDispatch()
  const artist = useAppSelector(artistState)
  const isLoading = useAppSelector(artistLoading)
  const artistId=useParams()


  useEffect(() => {
    dispatch(fetchArtist(artistId.id))
  }, [artistId.id, dispatch]);

  if(!isLoading && artist.length === 0){
    return (<Typography variant={'h6'}>
      Have nothing to load
    </Typography>)
  }


  return (
    <>
      <Typography variant={'h6'}>
        {isLoading ? (<CircularProgress />) : (artist[0].artistId.name)}
      </Typography>
      <Button to="/" component={NavLink} color="primary" variant="contained" sx={{mr:2}}>Back</Button>
    <Grid container spacing={2} sx={{mt:5}}>
      {isLoading ? (<CircularProgress />) :
        (artist.map(item => (
          <AlbumItem _id={item._id} title={item.title} cover={item.cover} releaseDate={item.releaseDate} key={item._id}/>
        )))}
    </Grid>
    </>
  );
};

export default Artist;