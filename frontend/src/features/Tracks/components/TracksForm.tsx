import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { TrackMutation } from '../../../types';
import { artistsState } from '../../Artists/artistsSlice.ts';
import { fetchArtists } from '../../Artists/artistsThunks.ts';
import { LoadingButton } from '@mui/lab';
import { isTracksUploading } from '../tracksSlice.ts';
import { albumsState } from '../../Albums/albumsSlice.ts';
import { fetchAlbumsByArtist } from '../../Albums/albumsThunks.ts';
import { submitTrack } from '../tracksThunks.ts';

//TODO duration field input data validation
//TODO unique position value validation

const TracksForm = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(artistsState);
  const albums = useAppSelector(albumsState);
  const isUploading = useAppSelector(isTracksUploading);


  const [artistSelected, setArtistSelected]=useState<string>(
    ''
  )
  const [state, setState] = useState<TrackMutation>({
    title: '',
    albumId: '',
    duration: 0,
    position: 0,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  useEffect(() => {
    if(artistSelected !== ''){
    dispatch(fetchAlbumsByArtist(artistSelected))
    }
  }, [artistSelected, artists, dispatch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(submitTrack(state)).unwrap();
      setState({
        title: '',
        albumId: '',
        duration: 0,
        position: 0,
      });
      setArtistSelected('')
    } catch (e) {
      console.log('Caught on try - SUBMIT FORM - ', e);
    }
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };
  const artistChangeHandler = async (e: SelectChangeEvent) => {
    setArtistSelected(e.target.value)
  };

  const selectChangeHandler = (e: SelectChangeEvent) => {
    setState((prevState) => {
      return { ...prevState, albumId: e.target.value };
    });
  };



  return (
    <>
      <Typography
        variant="body1"
        mb={2}
        mt={2}
        textAlign="center"
        textTransform="uppercase"
      >
        Add track
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={submitHandler}
      >
        <TextField
          type="text"
          id="title"
          label="Title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          required
          sx={{ marginBottom: '16px' }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Artists</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={artistSelected}
            label="Artists"
            required
            onChange={artistChangeHandler}
            sx={{ marginBottom: '16px' }}
          >
            {artists.map((item) =>
              item.isPublished ? (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ) : null,
            )}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Albums</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.albumId}
            label="Albums"
            required
            onChange={selectChangeHandler}
            sx={{ marginBottom: '16px' }}
          >
            {albums.map((item) =>
              item.isPublished ? (
                <MenuItem key={item._id} value={item._id}>
                  {item.title}
                </MenuItem>
              ) : null,
            )}
          </Select>
        </FormControl>
        <TextField
          type="number"
          InputProps={{ inputProps: { min: 0, max: 20, step:'any'} }}
          id="duration"
          label="Duration"
          value={state.duration}
          onChange={inputChangeHandler}
          name="duration"
          required
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          type="number"
          InputProps={{ inputProps: { min: 0, max: 16} }}
          id="position"
          label="Position"
          value={state.position}
          onChange={inputChangeHandler}
          name="position"
          required
          sx={{ marginBottom: '16px' }}
        />
        <LoadingButton
          type="submit"
          variant="contained"
          sx={{ marginTop: '16px', alignSelf: 'center' }}
          disabled={isUploading}
          loading={isUploading}
        >
          Submit
        </LoadingButton>
      </Box>
    </>
  );
};

export default TracksForm;
