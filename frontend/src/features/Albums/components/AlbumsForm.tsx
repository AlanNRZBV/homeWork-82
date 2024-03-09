import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { AlbumMutation } from '../../../types';
import { artistsState } from '../../Artists/artistsSlice.ts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchArtists } from '../../Artists/artistsThunks.ts';
import { Moment } from 'moment';
import { submitAlbum } from '../albumsThunks.ts';

const AlbumsForm = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(artistsState);

  const [state, setState] = useState<AlbumMutation>({
    cover: null,
    title: '',
    artistId: '',
    releaseDate: '',
  });
  const [value, setValue] = React.useState<Moment | null>(null);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(state)
      await dispatch(submitAlbum(state)).unwrap();
      // await dispatch(fetchListings());
      setState({
        cover: null,
        title: '',
        artistId: '',
        releaseDate: '',
      });
      setValue(null)
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

  const selectChangeHandler = (e: SelectChangeEvent) => {
    setState((prevState) => {
      return { ...prevState, artistId: e.target.value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const dateInputChangeHandler = (newValue: Moment | null) => {
    setValue(newValue);
    if(newValue){
    setState(prevState => ({
      ...prevState,
      releaseDate: newValue?.toISOString()
    }))
    }

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
        Add album
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
            value={state.artistId}
            label="Artists"
            onChange={selectChangeHandler}
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
        <FormControl sx={{ marginBottom: '16px' }}>
          <DatePicker
            label={'Release date'}
            openTo="year"
            value={value}
            onChange={dateInputChangeHandler}
            disableFuture
            slotProps={{
              textField: {
                required: true,
              },
            }}
          />
        </FormControl>
        <FileInput
          label="Cover"
          name="cover"
          onChange={fileInputChangeHandler}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: '16px', alignSelf: 'center' }}
        >
          Submit
        </Button>
      </Box>
    </>
  );
};

export default AlbumsForm;
