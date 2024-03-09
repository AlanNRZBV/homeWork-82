import { Box, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { ArtistMutation } from '../../../types';
import { isArtistsUploading } from '../artistsSlice.ts';
import { fetchArtists, submitArtist } from '../artistsThunks.ts';
import { LoadingButton } from '@mui/lab';

const ArtistsForm = () => {
  const dispatch = useAppDispatch();
  const isUploading = useAppSelector(isArtistsUploading);

  const [state, setState] = useState<ArtistMutation>({
    image: null,
    name: '',
    information: '',
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(submitArtist(state)).unwrap();
      setState({
        image: null,
        name: '',
        information: '',
      });
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

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
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
        Add artist
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={submitHandler}
      >
        <TextField
          type="text"
          id="name"
          label="Name"
          value={state.name}
          onChange={inputChangeHandler}
          name="name"
          required
          sx={{ marginBottom: '16px' }}
        />
        <TextField
          type="text"
          id="information"
          label="About"
          value={state.information}
          onChange={inputChangeHandler}
          name="information"
          required
          sx={{ marginBottom: '16px' }}
        />

        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
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

export default ArtistsForm;
