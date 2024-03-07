import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectUser } from '../../features/Users/usersSlice.ts';
import moment from 'moment';
import { addTrackToHistory } from '../../features/Tracks/tracksHistorythunks.ts';

interface Props {
  _id?: string;
  title?: string;
  duration?: string;
  createdAt?: string;
}

const CustomListItem: FC<Props> = ({ title, duration, createdAt, _id }) => {
  const dispatch = useAppDispatch();

  let dynamicData;

  const date = moment(createdAt).format('MMM Do YY, h:mm a');

  if (createdAt) {
    dynamicData = 'listened at ' + date;
  } else {
    dynamicData = duration;
  }

  const user = useAppSelector(selectUser);

  const clickHandler = async () => {
    if (_id) {
      console.log('track id ', _id)
      await dispatch(addTrackToHistory(_id));
    }
  };

  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {!createdAt ? (
        <IconButton
          onClick={clickHandler}
          aria-label="delete"
          disabled={user === null}
        >
          <PlayArrowIcon />
        </IconButton>
      ) : (
        <></>
      )}

      <Box display="flex" alignItems="center" sx={{ flexGrow: '1' }}>
        <Typography sx={{ marginRight: 'auto' }}>{title}</Typography>
        <Typography variant="body2" color="grey" ml={2} mr={2}>
          {dynamicData}
        </Typography>
      </Box>
    </li>
  );
};

export default CustomListItem;
