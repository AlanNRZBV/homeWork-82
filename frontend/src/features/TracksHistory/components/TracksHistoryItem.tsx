import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { TrackHistory } from '../../../types';

const TracksHistoryItem: FC<TrackHistory> = ({ datetime, trackId }) => {
  return (
    <li
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box display="flex" alignItems="center" sx={{ flexGrow: '1' }}>
        <Typography sx={{ marginRight: 'auto' }}>{trackId.title}</Typography>
        <Typography variant="body2" color="grey" ml={2} mr={2}>
          {datetime}
        </Typography>
      </Box>
    </li>
  );
};

export default TracksHistoryItem;
