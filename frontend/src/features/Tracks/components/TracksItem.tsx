import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { selectUser } from '../../Users/usersSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { TrackReduced } from '../../../types';
import { addTrackToHistory } from '../../TracksHistory/tracksHistorythunks.ts';

const TracksItem: FC<TrackReduced> = ({
  title,
  duration,
  _id,
  isPublished,
}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const clickHandler = async () => {
    if (_id) {
      await dispatch(addTrackToHistory(_id));
    }
  };

  const disabledColor = 'lightgrey';

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <IconButton
        onClick={clickHandler}
        aria-label="delete"
        disabled={user === null}
      >
        <PlayArrowIcon />
      </IconButton>
      <Box display="flex" alignItems="center" sx={{ flexGrow: '1' }}>
        <Typography
          sx={{ marginRight: 'auto' }}
          color={isPublished ? 'black' : disabledColor}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color={isPublished ? 'grey' : disabledColor}
          ml={2}
          mr={2}
        >
          {duration}
        </Typography>
      </Box>
    </li>
  );
};

export default TracksItem;
